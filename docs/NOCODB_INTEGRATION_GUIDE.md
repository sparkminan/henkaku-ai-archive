# NocoDB統合実装ガイド

## クイックスタート

### 1. NocoDB セットアップ

#### Option A: NocoDB Cloud（最も簡単）
1. https://app.nocodb.com にアクセス
2. 無料アカウント作成
3. 新しいプロジェクト作成

#### Option B: Dockerでローカル環境
```bash
# Docker Composeファイル作成
docker run -d --name nocodb \
  -p 8080:8080 \
  -v nocodb-data:/usr/app/data \
  nocodb/nocodb:latest
```

### 2. データベース構造のセットアップ

NocoDBのUIで以下のテーブルを作成：

#### Sessions テーブル
| フィールド名 | タイプ | 設定 |
|------------|--------|------|
| id | AutoNumber | Primary Key |
| slug | SingleLineText | Required, Unique |
| title | SingleLineText | Required |
| date | Date | Required |
| presenter | SingleLineText | Required |
| description | LongText | Required |
| thumbnail_url | SingleLineText | |
| video_url | URL | |
| status | SingleSelect | Options: draft, published |
| created_at | DateTime | Default: Now |
| updated_at | DateTime | Auto update |

#### Categories テーブル
| フィールド名 | タイプ | 設定 |
|------------|--------|------|
| id | AutoNumber | Primary Key |
| slug | SingleLineText | Required, Unique |
| name | SingleLineText | Required |
| description | LongText | |
| color | SingleLineText | |

#### Tags テーブル
| フィールド名 | タイプ | 設定 |
|------------|--------|------|
| id | AutoNumber | Primary Key |
| name | SingleLineText | Required, Unique |
| category | LinkToAnotherRecord | → Categories |

#### Materials テーブル
| フィールド名 | タイプ | 設定 |
|------------|--------|------|
| id | AutoNumber | Primary Key |
| session | LinkToAnotherRecord | → Sessions |
| title | SingleLineText | Required |
| type | SingleSelect | Options: slide, document, code, other |
| url | URL | Required |
| description | LongText | |

### 3. リレーション設定
- Sessions ↔ Tags: Many to Many
- Sessions → Materials: One to Many
- Categories → Tags: One to Many

## API統合実装

### 1. 必要なパッケージインストール
```bash
npm install axios
npm install --save-dev @types/node
```

### 2. 環境変数設定
```env
# .env.local
NOCODB_API_URL=https://app.nocodb.com/api/v1
NOCODB_API_TOKEN=your-api-token-here
NOCODB_PROJECT_ID=your-project-id
```

### 3. APIクライアント実装

```typescript
// src/lib/nocodb/client.ts
import axios from 'axios';

export class NocoDBClient {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NOCODB_API_URL,
      headers: {
        'xc-auth': process.env.NOCODB_API_TOKEN,
      },
    });
  }

  async getSessions(params?: {
    where?: string;
    limit?: number;
    offset?: number;
    sort?: string;
  }) {
    const response = await this.client.get('/db/data/v1/sessions', {
      params,
    });
    return response.data;
  }

  async getSessionBySlug(slug: string) {
    const response = await this.client.get('/db/data/v1/sessions', {
      params: {
        where: `(slug,eq,${slug})`,
      },
    });
    return response.data.list[0] || null;
  }

  async getCategories() {
    const response = await this.client.get('/db/data/v1/categories');
    return response.data.list;
  }

  async getTags() {
    const response = await this.client.get('/db/data/v1/tags');
    return response.data.list;
  }
}
```

### 4. データ型定義

```typescript
// src/types/nocodb.ts
export interface NocoDBSession {
  id: number;
  slug: string;
  title: string;
  date: string;
  presenter: string;
  description: string;
  thumbnail_url?: string;
  video_url?: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  Tags?: NocoDBTag[];
  Materials?: NocoDBMaterial[];
}

export interface NocoDBCategory {
  id: number;
  slug: string;
  name: string;
  description?: string;
  color?: string;
}

export interface NocoDBTag {
  id: number;
  name: string;
  category_id?: number;
  Category?: NocoDBCategory;
}

export interface NocoDBMaterial {
  id: number;
  session_id: number;
  title: string;
  type: 'slide' | 'document' | 'code' | 'other';
  url: string;
  description?: string;
}
```

### 5. データ変換ユーティリティ

```typescript
// src/lib/nocodb/transformer.ts
import { StudySession } from '@/types';
import { NocoDBSession } from '@/types/nocodb';

export function transformSession(dbSession: NocoDBSession): StudySession {
  return {
    id: dbSession.slug, // URLにはslugを使用
    title: dbSession.title,
    date: dbSession.date,
    presenter: dbSession.presenter,
    description: dbSession.description,
    tags: dbSession.Tags?.map(tag => tag.name) || [],
    materials: dbSession.Materials?.map(material => ({
      id: material.id.toString(),
      title: material.title,
      type: material.type,
      url: material.url,
      description: material.description || '',
    })) || [],
    thumbnailUrl: dbSession.thumbnail_url || '/images/ai-session-generic.svg',
    videoUrl: dbSession.video_url,
  };
}
```

### 6. Next.js ページ統合

```typescript
// src/pages/sessions/index.tsx
import { GetStaticProps } from 'next';
import { NocoDBClient } from '@/lib/nocodb/client';
import { transformSession } from '@/lib/nocodb/transformer';

export const getStaticProps: GetStaticProps = async () => {
  const client = new NocoDBClient();
  
  try {
    const dbSessions = await client.getSessions({
      where: '(status,eq,published)',
      sort: '-date',
    });
    
    const sessions = dbSessions.list.map(transformSession);
    
    return {
      props: { sessions },
      revalidate: 3600, // 1時間ごとに再生成
    };
  } catch (error) {
    console.error('Failed to fetch sessions:', error);
    return {
      props: { sessions: [] },
      revalidate: 60, // エラー時は1分後に再試行
    };
  }
};
```

## データ移行スクリプト

```javascript
// scripts/migrate-to-nocodb.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function migrateData() {
  const client = axios.create({
    baseURL: process.env.NOCODB_API_URL,
    headers: {
      'xc-auth': process.env.NOCODB_API_TOKEN,
    },
  });

  // 既存のJSONデータを読み込み
  const sessionsDir = path.join(__dirname, '../src/data/sessions');
  const files = fs.readdirSync(sessionsDir);

  for (const file of files) {
    if (file.endsWith('.json') && file !== 'index.json') {
      const data = JSON.parse(
        fs.readFileSync(path.join(sessionsDir, file), 'utf8')
      );

      // NocoDBフォーマットに変換
      const nocodbSession = {
        slug: `session-${data.id.padStart(3, '0')}`,
        title: data.title,
        date: data.date,
        presenter: data.presenter,
        description: data.description,
        thumbnail_url: data.thumbnailUrl,
        video_url: data.videoUrl,
        status: 'published',
      };

      try {
        // セッション作成
        const response = await client.post('/db/data/v1/sessions', nocodbSession);
        console.log(`✅ Migrated: ${data.title}`);

        // マテリアル追加
        for (const material of data.materials) {
          await client.post('/db/data/v1/materials', {
            session_id: response.data.id,
            title: material.title,
            type: material.type,
            url: material.url,
            description: material.description,
          });
        }
      } catch (error) {
        console.error(`❌ Failed to migrate: ${data.title}`, error.message);
      }
    }
  }
}

migrateData();
```

## 管理画面の使い方

### 1. セッション追加
1. NocoDBダッシュボードにログイン
2. Sessionsテーブルを開く
3. 「+ New Record」をクリック
4. フォームに入力
5. 「Save」をクリック

### 2. ビューの活用
- **Grid View**: エクセルライクな編集
- **Gallery View**: サムネイル付きカード表示
- **Form View**: 新規入力用フォーム
- **Kanban View**: ステータス別管理

### 3. フィルター・ソート
- 日付でソート
- ステータスでフィルター
- タグで検索

## トラブルシューティング

### APIトークンが無効
1. NocoDB設定 → API Tokens
2. 新しいトークンを生成
3. .env.localを更新

### CORSエラー
- Next.js API Routesを経由
- またはNocoDBのCORS設定を確認

### データが表示されない
1. statusが"published"か確認
2. APIレスポンスをconsole.logで確認
3. ネットワークタブでAPI呼び出しを確認