# 🤝 HENKAKU AI Archive - 開発者向けコントリビューションガイド

HENKAKU AI Archiveプロジェクトへようこそ！このドキュメントは、新しく参加する開発者がスムーズにプロジェクトに貢献できるようサポートすることを目的としています。

## 📋 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [開発を始める前に](#開発を始める前に)
3. [開発環境のセットアップ](#開発環境のセットアップ)
4. [プロジェクト構造](#プロジェクト構造)
5. [開発ワークフロー](#開発ワークフロー)
6. [コーディング規約](#コーディング規約)
7. [コミットメッセージ規約](#コミットメッセージ規約)
8. [プルリクエストのガイドライン](#プルリクエストのガイドライン)
9. [よくある質問](#よくある質問)

## 🎯 プロジェクト概要

HENKAKU AI Archiveは、生成AI技術に関する勉強会の資料や動画をアーカイブ・共有するためのWebアプリケーションです。

### 主な機能
- 📚 勉強会セッションの一覧表示・詳細表示
- 🔍 高度な検索・フィルタリング機能
- 🏷️ カテゴリ・タグによる分類
- 💾 Airtableとの連携によるデータ管理
- 🌓 ダークモード対応
- 📱 レスポンシブデザイン

## 🚀 開発を始める前に

### 必要な知識・スキル
- **必須**
  - JavaScript/TypeScript基礎知識
  - React基礎知識
  - Git/GitHubの基本操作
  
- **推奨**
  - Next.js 14の基礎知識
  - TailwindCSSの使用経験
  - 静的サイトジェネレーション（SSG）の理解

### 開発環境要件
- Node.js 18.0以上
- npm 8.0以上（またはyarn）
- Git
- VSCode（推奨エディタ）
- GitHub アカウント

## 💻 開発環境のセットアップ

詳細は [SETUP.md](./docs/SETUP.md) を参照してください。

### クイックスタート
```bash
# リポジトリのクローン
git clone https://github.com/sparkminan/henkaku-ai-archive.git
cd henkaku-ai-archive

# 依存関係のインストール
npm install

# 環境変数の設定（Airtable連携を使用する場合）
cp .env.local.example .env.local
# .env.localを編集してAirtable認証情報を設定

# 開発サーバーの起動
npm run dev

# http://localhost:3000 でアクセス
```

## 📁 プロジェクト構造

```
henkaku-ai-archive/
├── .github/            # GitHub Actions設定
├── docs/               # プロジェクトドキュメント
├── public/             # 静的ファイル
│   ├── images/        # 画像アセット
│   └── data/          # 静的JSONデータ
├── scripts/            # ユーティリティスクリプト
├── src/
│   ├── components/     # Reactコンポーネント
│   ├── contexts/       # Reactコンテキスト
│   ├── data/          # データファイル
│   ├── hooks/         # カスタムフック
│   ├── lib/           # ライブラリ・ユーティリティ
│   ├── pages/         # Next.jsページ
│   ├── styles/        # グローバルスタイル
│   ├── types/         # TypeScript型定義
│   └── utils/         # ユーティリティ関数
```

## 🔄 開発ワークフロー

### 1. イシューの確認・作成
- [Issues](https://github.com/sparkminan/henkaku-ai-archive/issues)から作業したいタスクを選択
- 新しい機能やバグ修正の場合は、まずイシューを作成

### 2. ブランチの作成
```bash
# 最新のmainブランチを取得
git checkout main
git pull origin main

# 作業ブランチを作成
git checkout -b feature/your-feature-name
# または
git checkout -b fix/bug-description
```

### 3. 開発作業
- コードの変更
- テストの実行（将来実装予定）
- ローカルでの動作確認

### 4. コミット
```bash
# 変更をステージング
git add .

# コミット（規約に従ったメッセージで）
git commit -m "feat: 新機能の説明"
```

### 5. プッシュとプルリクエスト
```bash
# リモートにプッシュ
git push origin feature/your-feature-name

# GitHubでプルリクエストを作成
```

## 📝 コーディング規約

### TypeScript/JavaScript
- 関数名・変数名は`camelCase`
- コンポーネント名は`PascalCase`
- 定数は`UPPER_SNAKE_CASE`
- TypeScriptの型を積極的に使用

### React
- 関数コンポーネントを使用
- カスタムフックは`use`プレフィックスを付ける
- Props型は明示的に定義

### スタイリング
- TailwindCSSのユーティリティクラスを優先使用
- カスタムクラスは`globals.css`に定義
- サイバーパンク風のデザインシステムに従う

### 例
```typescript
// コンポーネントの例
interface SessionCardProps {
  session: StudySession;
  onClick?: () => void;
}

export default function SessionCard({ session, onClick }: SessionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="card-cyber hover:scale-105 transition-transform">
      {/* コンテンツ */}
    </div>
  );
}
```

## 💬 コミットメッセージ規約

[Conventional Commits](https://www.conventionalcommits.org/) に従います：

```
<type>: <subject>

[optional body]

[optional footer]
```

### Type
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメントのみの変更
- `style`: コードの意味に影響しない変更（空白、フォーマット等）
- `refactor`: バグ修正や機能追加を伴わないコード変更
- `perf`: パフォーマンス改善
- `test`: テストの追加・修正
- `chore`: ビルドプロセスやツールの変更

### 例
```
feat: セッション詳細ページにポッドキャスト再生機能を追加

- NotebookLMのポッドキャストURLを埋め込み表示
- 再生コントロールを追加
- レスポンシブ対応

Closes #123
```

## 🔍 プルリクエストのガイドライン

### PRを作成する前に
- [ ] ローカルで動作確認済み
- [ ] `npm run build`が成功する
- [ ] 不要な`console.log`を削除
- [ ] コーディング規約に従っている

### PRテンプレート
```markdown
## 概要
このPRで解決する問題や追加する機能の説明

## 変更内容
- 変更点1
- 変更点2

## 動作確認
- [ ] ローカルで動作確認済み
- [ ] ビルドが成功する
- [ ] 既存機能への影響なし

## スクリーンショット（UIの変更がある場合）
変更前：
変更後：

## 関連イシュー
Closes #番号
```

## ❓ よくある質問

### Q: 開発サーバーが起動しない
A: Node.jsのバージョンを確認してください。18.0以上が必要です。

### Q: Airtableのデータが表示されない
A: 
1. `.env.local`に正しい認証情報が設定されているか確認
2. `npm run fetch-airtable`でデータを取得
3. GitHub Pages環境では静的JSONファイルが使用されます

### Q: デザインの参考資料はありますか？
A: `public/images/`内の画像や、既存のコンポーネントを参考にしてください。サイバーパンク風のネオンカラーを基調としています。

### Q: 新しいセッションを追加するには？
A: 
1. `npm run add-session`コマンドを使用（対話式）
2. または手動で`src/data/sessions/`にJSONファイルを作成

## 📞 サポート

質問やサポートが必要な場合：
1. [GitHub Issues](https://github.com/sparkminan/henkaku-ai-archive/issues)で質問
2. [HENKAKU Discord](https://discord.gg/henkaku)のAIチャンネル
3. プロジェクトメンテナー: @sparkminan

---

🙏 **Thank you for contributing!**

皆様のコントリビューションが、HENKAKU生成AI会の知識共有をより良いものにします。