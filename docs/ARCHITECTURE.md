# 🏗 技術スタック・アーキテクチャ詳細

このドキュメントでは、HENKAKU AI Archiveプロジェクトの技術的な構成と設計思想について詳しく説明します。

## 📋 目次

1. [技術スタック概要](#技術スタック概要)
2. [アーキテクチャ設計](#アーキテクチャ設計)
3. [ディレクトリ構造詳細](#ディレクトリ構造詳細)
4. [データフロー](#データフロー)
5. [主要コンポーネント](#主要コンポーネント)
6. [状態管理](#状態管理)
7. [スタイリング戦略](#スタイリング戦略)
8. [パフォーマンス最適化](#パフォーマンス最適化)
9. [セキュリティ考慮事項](#セキュリティ考慮事項)

## 🛠 技術スタック概要

### フロントエンド

| 技術 | バージョン | 用途 |
|------|-----------|------|
| **Next.js** | 14.x | Reactフレームワーク、SSG対応 |
| **React** | 18.x | UIライブラリ |
| **TypeScript** | 5.x | 型安全性の確保 |
| **TailwindCSS** | 3.x | ユーティリティファーストCSS |
| **Lucide React** | latest | アイコンライブラリ |

### データ管理

| 技術 | 用途 |
|------|------|
| **Airtable** | 外部データベース（コンテンツ管理） |
| **JSON** | 静的データストレージ |
| **Context API** | グローバル状態管理 |

### ビルド・デプロイ

| 技術 | 用途 |
|------|------|
| **GitHub Actions** | CI/CD パイプライン |
| **GitHub Pages** | ホスティング |
| **npm scripts** | タスク自動化 |

## 🏛 アーキテクチャ設計

### 全体構成

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Airtable DB   │────▶│  GitHub Actions  │────▶│  Static JSON    │
│  (Content CMS)  │     │  (Data Fetcher)  │     │     Files       │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                                           │
                                                           ▼
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  GitHub Pages   │◀────│   Next.js SSG    │◀────│   Build Time    │
│ (Static Host)   │     │  (HTML/JS/CSS)   │     │   Data Load     │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐
│   End Users     │
│   (Browsers)    │
└─────────────────┘
```

### 設計原則

1. **静的優先**: 可能な限り静的生成を使用
2. **プログレッシブエンハンスメント**: JavaScriptが無効でも基本機能は動作
3. **レスポンシブファースト**: モバイルから大画面まで対応
4. **パフォーマンス重視**: 軽量で高速なユーザー体験

## 📁 ディレクトリ構造詳細

```
src/
├── components/          # UIコンポーネント
│   ├── Layout.tsx      # 共通レイアウト
│   ├── Header.tsx      # ヘッダーナビゲーション
│   ├── Footer.tsx      # フッター
│   ├── StudySessionCard.tsx  # セッションカード
│   ├── ThemeToggle.tsx # テーマ切り替え
│   └── ...
├── contexts/           # React Context
│   ├── ThemeContext.tsx      # テーマ管理
│   ├── FavoritesContext.tsx  # お気に入り管理
│   └── DataContext.tsx       # データキャッシュ
├── hooks/              # カスタムフック
│   ├── useAirtableData.ts    # Airtableデータ取得
│   └── useKeyboardShortcuts.ts # キーボード操作
├── pages/              # Next.jsページ
│   ├── index.tsx       # ホームページ
│   ├── sessions.tsx    # セッション一覧
│   ├── sessions/[id].tsx # セッション詳細
│   ├── categories.tsx  # カテゴリ一覧
│   └── about.tsx       # アバウトページ
├── lib/                # ライブラリ・ユーティリティ
│   ├── airtable-client.ts    # Airtable API
│   └── data-provider.ts      # データプロバイダー
├── types/              # TypeScript型定義
│   └── index.ts        # 共通型定義
└── utils/              # ユーティリティ関数
    ├── dataLoader.ts   # データ読み込み
    └── config.ts       # 設定管理
```

## 🔄 データフロー

### 1. ビルド時データフロー

```typescript
// ビルド時にAirtableからデータを取得
// scripts/fetch-airtable-data.js
async function fetchAirtableData() {
  const records = await airtable.select().all();
  const sessions = formatSessions(records);
  fs.writeFileSync('src/data/airtable-sessions.json', JSON.stringify(sessions));
}

// ページ生成時にデータを読み込み
// pages/sessions/[id].tsx
export async function getStaticProps({ params }) {
  const sessions = await loadAllSessions();
  const session = sessions.find(s => s.id === params.id);
  return { props: { session } };
}
```

### 2. クライアントサイドデータフロー

```typescript
// Contextでグローバル状態を管理
// contexts/FavoritesContext.tsx
const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

// カスタムフックでデータ取得
// hooks/useAirtableData.ts
export function useAirtableSessions() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  
  useEffect(() => {
    fetch('/henkaku-ai-archive/data/airtable-sessions.json')
      .then(res => res.json())
      .then(data => setSessions(data));
  }, []);
  
  return { sessions };
}
```

## 🧩 主要コンポーネント

### StudySessionCard

セッション情報を表示するカードコンポーネント

```typescript
interface StudySessionCardProps {
  session: StudySession;
  onFavoriteToggle?: (id: string) => void;
}

// 特徴:
// - サイバーパンク風デザイン
// - ホバーエフェクト
// - お気に入り機能
// - レスポンシブ対応
```

### Layout

全ページ共通のレイアウトコンポーネント

```typescript
interface LayoutProps {
  children: React.ReactNode;
  onSearch?: (query: string) => void;
}

// 機能:
// - ヘッダー/フッター表示
// - 検索機能の統合
// - テーマ切り替え
// - キーボードショートカット
```

### ThemeToggle

ダーク/ライトモード切り替えコンポーネント

```typescript
// 実装:
// - localStorage でテーマを永続化
// - システム設定の自動検出
// - スムーズなトランジション
```

## 💾 状態管理

### グローバル状態

1. **テーマ状態** (ThemeContext)
   - ダーク/ライトモード
   - システム設定の追従

2. **お気に入り状態** (FavoritesContext)
   - セッションのお気に入り管理
   - localStorage永続化

3. **データキャッシュ** (DataContext)
   - セッションデータのキャッシュ
   - 再取得の最小化

### ローカル状態

- 検索クエリ
- フィルター条件
- ページネーション
- UIの開閉状態

## 🎨 スタイリング戦略

### TailwindCSS設定

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00D9FF',
        'neon-purple': '#9D00FF',
        'neon-pink': '#FF006E',
        'cyber': {
          300: '#64FFDA',
          400: '#00D9FF',
          500: '#0099DB',
        }
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
      }
    }
  }
}
```

### カスタムクラス

```css
/* globals.css */
.card-cyber {
  @apply bg-dark-800 border border-cyber-500/50 rounded-lg;
  @apply hover:border-neon-blue hover:shadow-neon transition-all;
}

.btn-cyber-primary {
  @apply px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple;
  @apply text-white font-cyber rounded-lg;
  @apply hover:shadow-neon transform hover:scale-105;
}
```

## ⚡ パフォーマンス最適化

### 1. 静的生成 (SSG)

```typescript
// すべてのセッションページを事前生成
export async function getStaticPaths() {
  const sessions = await loadAllSessions();
  const paths = sessions.map(s => ({ params: { id: s.id } }));
  return { paths, fallback: false };
}
```

### 2. 画像最適化

- SVG形式の活用（アイコン、イラスト）
- 適切な画像フォーマット選択
- 遅延読み込みの実装

### 3. コード分割

```typescript
// 動的インポートでバンドルサイズ削減
const DynamicComponent = dynamic(
  () => import('../components/HeavyComponent'),
  { loading: () => <LoadingSpinner /> }
);
```

### 4. キャッシュ戦略

- 静的アセットの長期キャッシュ
- Service Worker（将来実装予定）
- CDN活用（GitHub Pages）

## 🔒 セキュリティ考慮事項

### 1. 環境変数管理

```bash
# .env.local (開発環境のみ)
AIRTABLE_API_KEY=key_xxxx  # 本番環境では GitHub Secrets

# クライアントサイドで使用する変数
NEXT_PUBLIC_BASE_PATH=/henkaku-ai-archive
```

### 2. XSS対策

- Reactの自動エスケープ機能を活用
- dangerouslySetInnerHTMLの使用を避ける
- ユーザー入力の適切なサニタイズ

### 3. 依存関係の管理

```bash
# 定期的な脆弱性チェック
npm audit

# 自動修正
npm audit fix
```

### 4. CORS設定

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
};
```

## 🔮 将来の拡張計画

### 技術的な改善

1. **テスト環境の構築**
   - Jest + React Testing Library
   - Cypress E2Eテスト

2. **PWA対応**
   - Service Worker実装
   - オフライン対応

3. **国際化（i18n）**
   - next-i18next導入
   - 多言語コンテンツ管理

4. **分析ツール**
   - Google Analytics
   - パフォーマンスモニタリング

### アーキテクチャの進化

1. **マイクロフロントエンド**
   - Module Federation検討

2. **エッジコンピューティング**
   - Vercel Edge Functions
   - Cloudflare Workers

3. **リアルタイム機能**
   - WebSocket統合
   - リアルタイムコメント

---

詳細な実装については、各コンポーネントのソースコードとコメントを参照してください。