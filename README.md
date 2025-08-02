# HENKAKU 生成AI会 アーカイブサイト

HENKAKUコミュニティの生成AI勉強会で発表された資料や情報をアーカイブするWebサイトです。

## 🚀 特徴

- **体系的な整理**: 勉強会資料をカテゴリやタグで分類
- **高度な検索機能**: タイトル、内容、発表者、タグでの横断検索
- **レスポンシブデザイン**: PC・タブレット・スマートフォンに対応
- **モダンなUI**: TailwindCSSを使用した美しいデザイン

## 🛠 技術スタック

- **フレームワーク**: Next.js 14
- **言語**: TypeScript
- **スタイリング**: TailwindCSS
- **アイコン**: Lucide React
- **データ**: JSON（将来的にはCMSやデータベースに移行予定）

## 📁 プロジェクト構造

```
henkaku-ai-archive/
├── public/                 # 静的ファイル
│   ├── images/            # 画像ファイル
│   └── documents/         # 資料ファイル
├── src/
│   ├── components/        # Reactコンポーネント
│   ├── pages/            # Next.jsページ
│   ├── data/             # データファイル
│   ├── types/            # TypeScript型定義
│   └── styles/           # CSSファイル
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 🏗 ローカル環境での実行

### 前提条件

- Node.js 18.0以上
- npm または yarn

### セットアップ手順

1. 依存関係をインストール
```bash
npm install
```

2. 開発サーバーを起動
```bash
npm run dev
```

3. ブラウザで http://localhost:3000 にアクセス

### その他のコマンド

```bash
# プロダクションビルド
npm run build

# プロダクションサーバーを起動
npm start

# コードの lint チェック
npm run lint
```

## 📄 ページ構成

- **ホーム (/)**: サイトの概要と最新の勉強会
- **勉強会一覧 (/sessions)**: すべての勉強会の一覧と検索・フィルター機能
- **勉強会詳細 (/sessions/[id])**: 個別の勉強会の詳細情報と資料
- **カテゴリ (/categories)**: カテゴリ別の勉強会分類
- **このサイトについて (/about)**: サイトの目的と使い方

## 🗂 データ構造

### StudySession（勉強会）
```typescript
interface StudySession {
  id: string;
  title: string;
  date: string;
  presenter: string;
  description: string;
  tags: string[];
  materials: Material[];
  videoUrl?: string;
  thumbnailUrl?: string;
}
```

### Material（資料）
```typescript
interface Material {
  id: string;
  title: string;
  type: 'slide' | 'document' | 'code' | 'other';
  url: string;
  description?: string;
}
```

### Category（カテゴリ）
```typescript
interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}
```

## 🎨 デザインシステム

### カラーパレット
- **プライマリ**: Blue (Tailwind blue scale)
- **セカンダリ**: Gray scale
- **アクセント**: 各カテゴリごとに異なる色

### レスポンシブブレークポイント
- **sm**: 640px以上
- **md**: 768px以上
- **lg**: 1024px以上
- **xl**: 1280px以上

## 📝 コンテンツ管理

現在はJSONファイルでデータを管理していますが、将来的には以下の移行を検討：

- Headless CMS (Strapi, Contentful等)
- データベース (PostgreSQL, MongoDB等)
- GitHub-based CMS

## 🚀 デプロイ

### Vercel（推奨）
1. GitHubリポジトリにプッシュ
2. Vercelでプロジェクトをインポート
3. 自動デプロイ設定

### Netlify
1. `npm run build`でビルド
2. `out`フォルダをNetlifyにデプロイ

### その他
- AWS S3 + CloudFront
- Google Cloud Platform
- Firebase Hosting

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📋 開発予定

- [ ] 管理画面の実装
- [ ] 勉強会資料のアップロード機能
- [ ] ユーザー認証機能
- [ ] コメント・レビュー機能
- [ ] RSS/Atom フィード
- [ ] PWA対応
- [ ] 多言語対応

## 📞 お問い合わせ

- **HENKAKUコミュニティ**: [Discord](https://discord.gg/henkaku)
- **公式サイト**: [henkaku.org](https://henkaku.org)

## 📄 ライセンス

このプロジェクトはMITライセンスのもとで公開されています。詳細は[LICENSE](LICENSE)ファイルをご覧ください。

---

## 🙏 謝辞

HENKAKU生成AI会の発表者の皆様、コミュニティの運営者・参加者の皆様に感謝申し上げます。
