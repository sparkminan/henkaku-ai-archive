# 🛠 開発環境セットアップガイド

このガイドでは、HENKAKU AI Archiveプロジェクトの開発環境を構築する手順を詳しく説明します。

## 📋 目次

1. [前提条件](#前提条件)
2. [環境構築手順](#環境構築手順)
3. [VSCode推奨設定](#vscode推奨設定)
4. [Airtable連携設定](#airtable連携設定)
5. [GitHub Pages設定](#github-pages設定)
6. [開発用コマンド一覧](#開発用コマンド一覧)
7. [環境別の設定](#環境別の設定)

## 🔧 前提条件

### 必須ツール
- **Node.js**: v18.0.0以上
  - 確認: `node --version`
  - インストール: [nodejs.org](https://nodejs.org/)
  
- **npm**: v8.0.0以上（Node.jsに同梱）
  - 確認: `npm --version`
  
- **Git**: 最新版推奨
  - 確認: `git --version`
  - インストール: [git-scm.com](https://git-scm.com/)

### 推奨ツール
- **VSCode**: 最新版
  - [code.visualstudio.com](https://code.visualstudio.com/)
- **GitHub CLI**: プルリクエスト作成を効率化
  - インストール: `winget install GitHub.cli` (Windows)

## 🚀 環境構築手順

### 1. リポジトリのクローン

```bash
# HTTPSでクローン（推奨）
git clone https://github.com/sparkminan/henkaku-ai-archive.git

# または SSHでクローン
git clone git@github.com:sparkminan/henkaku-ai-archive.git

# プロジェクトディレクトリに移動
cd henkaku-ai-archive
```

### 2. 依存関係のインストール

```bash
# npmを使用
npm install

# またはyarnを使用（オプション）
yarn install
```

### 3. 環境変数の設定

```bash
# .env.localファイルを作成
cp .env.local.example .env.local

# Windows PowerShellの場合
Copy-Item .env.local.example .env.local
```

`.env.local`ファイルを編集：
```env
# Airtable設定（オプション）
AIRTABLE_API_KEY=your_api_key_here
AIRTABLE_BASE_ID=your_base_id_here
AIRTABLE_TABLE_NAME=Sessions

# GitHub Pages設定
NEXT_PUBLIC_BASE_PATH=/henkaku-ai-archive
```

### 4. 開発サーバーの起動

```bash
npm run dev

# http://localhost:3000 でアクセス可能
```

### 5. 動作確認

- ブラウザで http://localhost:3000 を開く
- ホームページが正しく表示されることを確認
- セッション一覧ページが表示されることを確認

## 💻 VSCode推奨設定

### 推奨拡張機能

`.vscode/extensions.json`を作成：
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets",
    "formulahendry.auto-rename-tag",
    "streetsidesoftware.code-spell-checker",
    "yzhang.markdown-all-in-one"
  ]
}
```

### ワークスペース設定

`.vscode/settings.json`を作成：
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

## 🔗 Airtable連携設定

### 1. Airtableアカウントの準備
1. [Airtable](https://airtable.com/)でアカウント作成
2. Personal Access Tokenを生成
   - Account → Developer hub → Personal access tokens
3. ベースIDを確認
   - ベースを開いてURLから確認: `airtable.com/appXXXXXXXXXXXXXX`

### 2. ローカル開発での使用

```bash
# Airtableからデータを取得
npm run fetch-airtable

# データは src/data/airtable-sessions.json に保存される
```

### 3. 本番環境での設定

GitHub Secretsに以下を設定：
- `AIRTABLE_API_KEY`
- `AIRTABLE_BASE_ID`
- `AIRTABLE_TABLE_NAME`

## 📦 GitHub Pages設定

### 初回設定

1. GitHubリポジトリの Settings → Pages
2. Source: "GitHub Actions" を選択
3. `.github/workflows/deploy.yml` が自動デプロイを実行

### デプロイの流れ

```bash
# 1. 変更をコミット
git add .
git commit -m "feat: 新機能追加"

# 2. mainブランチにプッシュ
git push origin main

# 3. GitHub Actionsが自動的に以下を実行：
#    - ビルド
#    - Airtableからデータ取得
#    - GitHub Pagesへデプロイ
```

## 🔨 開発用コマンド一覧

### 基本コマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start

# Lintチェック
npm run lint
```

### データ管理コマンド

```bash
# 新しいセッションを追加（対話式）
npm run add-session

# Airtableからデータを取得
npm run fetch-airtable

# セッションデータをCSVにエクスポート
npm run export-csv

# セッションファイルを分割（メンテナンス用）
npm run split-sessions
```

### Git関連

```bash
# ブランチ作成
git checkout -b feature/new-feature

# 変更を確認
git status

# 差分を確認
git diff

# コミット
git add .
git commit -m "feat: 説明"

# プッシュ
git push origin feature/new-feature
```

## 🌍 環境別の設定

### 開発環境（ローカル）

```javascript
// next.config.js での設定
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  basePath: isDev ? '' : '/henkaku-ai-archive',
  // その他の設定
};
```

### 本番環境（GitHub Pages）

- 静的ファイルとしてエクスポート
- APIルートは使用不可
- 画像やデータは`public/`ディレクトリに配置

### テスト環境（将来実装予定）

```bash
# テスト実行（現在未実装）
npm test

# E2Eテスト（将来実装予定）
npm run test:e2e
```

## 🐛 よくある問題と解決方法

### ポート3000が使用中

```bash
# 別のポートで起動
PORT=3001 npm run dev

# または使用中のプロセスを終了
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### 依存関係のエラー

```bash
# node_modulesとpackage-lock.jsonを削除して再インストール
rm -rf node_modules package-lock.json
npm install

# Windows PowerShell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

### ビルドエラー

```bash
# キャッシュをクリア
npm run clean
npm run build

# .nextディレクトリを手動削除
rm -rf .next
npm run build
```

## 📝 チェックリスト

開発を始める前に以下を確認：

- [ ] Node.js v18以上がインストールされている
- [ ] Gitが設定されている（user.name, user.email）
- [ ] プロジェクトのクローンが完了している
- [ ] `npm install`が成功している
- [ ] `npm run dev`でローカルサーバーが起動する
- [ ] http://localhost:3000 でサイトが表示される
- [ ] VSCodeの推奨拡張機能をインストールした

## 🆘 サポート

問題が解決しない場合：

1. [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)を確認
2. [GitHub Issues](https://github.com/sparkminan/henkaku-ai-archive/issues)で検索
3. 新しいIssueを作成して質問

---

Happy Coding! 🚀