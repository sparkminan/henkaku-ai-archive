# データベース連携アーキテクチャ設計

## 概要
現在のJSON静的ファイルシステムから、NocoDBなどのノーコードデータベースツールと連携するアーキテクチャへの移行設計。

## 推奨ノーコードDBツールの比較

### 1. **NocoDB** (推奨)
- ✅ **完全無料のセルフホスト版あり**
- ✅ REST API・GraphQL API対応
- ✅ Airtableライクな使いやすいUI
- ✅ リアルタイムコラボレーション
- ✅ 多様なビュー（Grid、Gallery、Kanban、Form）
- ✅ Webhook対応
- ✅ 認証・権限管理
- 🔗 [NocoDB Cloud](https://www.nocodb.com/) - 無料プランあり
- 🔗 セルフホスト可能（Docker、Heroku、Railway）

### 2. **Supabase**
- ✅ 無料枠が充実（500MB、無制限API）
- ✅ PostgreSQLベース
- ✅ リアルタイム機能
- ✅ 認証機能内蔵
- ❌ UI管理画面はシンプル（開発者向け）

### 3. **Airtable**
- ✅ 最高のUI/UX
- ✅ 豊富なテンプレート
- ❌ 無料プランの制限が厳しい（1,200レコード）
- ❌ API制限あり（5リクエスト/秒）

### 4. **Baserow**
- ✅ オープンソース
- ✅ セルフホスト可能
- ✅ Airtableクローン
- ✅ REST API対応
- ❌ 日本語ドキュメントが少ない

## 推奨アーキテクチャ

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Next.js App   │────▶│   API Routes     │────▶│     NocoDB      │
│  (Vercel/GH)    │     │  (Data Fetcher)  │     │ (Self-hosted/   │
│                 │     │                  │     │     Cloud)      │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                       │                         │
         │                       │                         ▼
         ▼                       ▼                  ┌─────────────┐
  ┌──────────────┐       ┌──────────────┐         │   管理UI    │
  │ Static Cache │       │ Build-time   │         │ (NocoDB UI) │
  │    (ISR)     │       │   Fetching   │         └─────────────┘
  └──────────────┘       └──────────────┘
```

## データベース設計

### Sessions テーブル
```sql
sessions
├── id (Integer, Primary Key, Auto-increment)
├── slug (String, Unique) -- URLに使用
├── title (String, Required)
├── date (Date, Required)
├── presenter (String, Required)
├── description (Long Text, Required)
├── thumbnail_url (String)
├── video_url (String, Optional)
├── status (Select: draft/published)
├── created_at (DateTime)
├── updated_at (DateTime)
└── sort_order (Integer) -- 表示順制御
```

### Categories テーブル
```sql
categories
├── id (Integer, Primary Key)
├── slug (String, Unique)
├── name (String, Required)
├── description (Text)
├── color (String)
├── icon (String)
└── sort_order (Integer)
```

### Tags テーブル
```sql
tags
├── id (Integer, Primary Key)
├── name (String, Unique)
└── category_id (Foreign Key → categories)
```

### Materials テーブル
```sql
materials
├── id (Integer, Primary Key)
├── session_id (Foreign Key → sessions)
├── title (String, Required)
├── type (Select: slide/document/code/other)
├── url (String, Required)
├── description (Text)
└── sort_order (Integer)
```

### Session_Tags (多対多リレーション)
```sql
session_tags
├── session_id (Foreign Key → sessions)
└── tag_id (Foreign Key → tags)
```

## 実装戦略

### Phase 1: データベースセットアップ
1. NocoDB インスタンスの準備
   - Option A: NocoDB Cloudの無料プラン
   - Option B: Railway/Render等でセルフホスト
   - Option C: ローカルDockerで開発

2. スキーマ作成とデータ移行
   - 既存JSONデータをCSVエクスポート
   - NocoDBにインポート
   - リレーション設定

### Phase 2: API統合
```typescript
// src/lib/nocodb-client.ts
export class NocoDBClient {
  private baseUrl: string;
  private apiToken: string;

  async getSessions(options?: {
    limit?: number;
    offset?: number;
    where?: string;
    sort?: string;
  }): Promise<Session[]> {
    // REST API呼び出し
  }

  async getSessionBySlug(slug: string): Promise<Session | null> {
    // 単一セッション取得
  }

  async getCategories(): Promise<Category[]> {
    // カテゴリ一覧取得
  }
}
```

### Phase 3: Next.js統合パターン

#### Option A: Static Generation + ISR (推奨)
```typescript
// pages/sessions/[slug].tsx
export async function getStaticProps({ params }) {
  const session = await nocodbClient.getSessionBySlug(params.slug);
  
  return {
    props: { session },
    revalidate: 3600 // 1時間ごとに再生成
  }
}
```

#### Option B: API Routes + Client-side Fetching
```typescript
// pages/api/sessions/index.ts
export default async function handler(req, res) {
  const sessions = await nocodbClient.getSessions(req.query);
  res.json(sessions);
}
```

### Phase 4: 管理フロー

1. **コンテンツ管理者**
   - NocoDB UIで直接データ入力
   - フォームビューで簡単入力
   - ギャラリービューで視覚的確認

2. **開発者**
   - Webhook設定で自動デプロイ
   - バリデーションルール設定
   - APIトークン管理

## 環境変数設定

```env
# .env.local
NOCODB_API_URL=https://your-instance.nocodb.com
NOCODB_API_TOKEN=your-api-token
NOCODB_PROJECT_ID=your-project-id
NOCODB_SESSIONS_TABLE_ID=your-sessions-table-id
```

## メリット

1. **管理の簡易化**
   - エクセルライクなUIで誰でも編集可能
   - リアルタイムプレビュー
   - 履歴管理

2. **スケーラビリティ**
   - データ量の制限なし（セルフホスト時）
   - 高速なクエリ処理
   - キャッシュ戦略で高速化

3. **開発効率**
   - APIが自動生成
   - 型定義の自動生成可能
   - Webhook連携

## 移行ロードマップ

### Week 1-2: 準備
- [ ] NocoDB環境構築
- [ ] スキーマ設計確定
- [ ] データ移行スクリプト作成

### Week 3-4: 実装
- [ ] API クライアント開発
- [ ] Next.js統合
- [ ] キャッシュ戦略実装

### Week 5: テスト・最適化
- [ ] パフォーマンステスト
- [ ] 管理者トレーニング
- [ ] 本番環境移行

## セキュリティ考慮事項

1. **APIトークン管理**
   - 環境変数で管理
   - 読み取り専用トークン使用
   - CORS設定

2. **データ検証**
   - 入力値のサニタイゼーション
   - 型チェック
   - SQLインジェクション対策（NocoDB側で対応）

## コスト試算

### NocoDB Cloud（推奨）
- Free tier: $0/月
  - 3 bases
  - 1,000 records/base
  - 1GB storage
  - 十分な容量

### セルフホスト
- Railway: ~$5/月
- Render: 無料枠あり
- VPS: ~$5-10/月