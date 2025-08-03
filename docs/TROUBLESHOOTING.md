# 🔧 トラブルシューティングガイド

開発中によく遭遇する問題と解決方法をまとめています。

## 📋 目次

1. [環境構築の問題](#環境構築の問題)
2. [ビルド・デプロイの問題](#ビルドデプロイの問題)
3. [開発中の問題](#開発中の問題)
4. [Airtable連携の問題](#airtable連携の問題)
5. [GitHub Pages関連](#github-pages関連)
6. [パフォーマンスの問題](#パフォーマンスの問題)
7. [その他の問題](#その他の問題)

## 🛠 環境構築の問題

### Node.jsバージョンエラー

**症状**
```
error: Node.js version 16.x.x is not supported. Please use Node.js 18.0 or higher.
```

**解決方法**
```bash
# Node.jsバージョン確認
node --version

# nvmを使用している場合
nvm install 18
nvm use 18

# または公式サイトから最新版をダウンロード
# https://nodejs.org/
```

### npm installが失敗する

**症状**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**解決方法**
```bash
# キャッシュクリア
npm cache clean --force

# node_modulesとpackage-lock.jsonを削除
rm -rf node_modules package-lock.json
# Windows
rmdir /s node_modules
del package-lock.json

# 再インストール
npm install

# それでも失敗する場合
npm install --legacy-peer-deps
```

### ポート3000が使用中

**症状**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**解決方法**
```bash
# 別のポートで起動
PORT=3001 npm run dev

# Windows PowerShell
$env:PORT="3001"; npm run dev

# 使用中のプロセスを確認して終了
# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID番号> /F
```

## 🏗 ビルド・デプロイの問題

### ビルドエラー

**症状**
```
Type error: Cannot find module '@/components/Layout' or its corresponding type declarations.
```

**解決方法**
```bash
# TypeScriptのパスエイリアス確認
# tsconfig.jsonの"paths"設定を確認

# .nextディレクトリをクリア
rm -rf .next
npm run build

# VSCodeを再起動してTypeScriptサーバーをリセット
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### 静的エクスポートエラー

**症状**
```
Error: Image Optimization using Next.js' default loader is not compatible with `next export`.
```

**解決方法**
```javascript
// next.config.js に追加
module.exports = {
  images: {
    unoptimized: true,
  },
  // その他の設定...
}
```

### GitHub Actions失敗

**症状**
GitHub Actionsでビルドが失敗する

**解決方法**
1. Actionsタブでエラーログを確認
2. ローカルで同じコマンドを実行して再現
```bash
npm run build
npm run export
```
3. 環境変数の設定を確認（GitHub Secrets）

## 💻 開発中の問題

### ホットリロードが効かない

**症状**
ファイルを変更しても自動的に反映されない

**解決方法**
```bash
# 開発サーバーを再起動
Ctrl + C
npm run dev

# それでも効かない場合
# .nextディレクトリを削除
rm -rf .next
npm run dev

# Windows環境の場合、ファイル監視の上限を確認
# PowerShell（管理者権限）で実行
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
```

### TypeScriptエラーが消えない

**症状**
修正したはずのTypeScriptエラーが残る

**解決方法**
```bash
# TypeScriptキャッシュをクリア
rm -rf node_modules/.cache/typescript

# VSCodeの場合
# 1. Cmd/Ctrl + Shift + P
# 2. "TypeScript: Restart TS Server"を実行
# 3. "Developer: Reload Window"を実行
```

### スタイルが適用されない

**症状**
TailwindCSSのクラスが効かない

**解決方法**
```javascript
// tailwind.config.jsの設定を確認
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  // ...
}

// globals.cssでTailwindをインポートしているか確認
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🔌 Airtable連携の問題

### データが取得できない

**症状**
Airtableからデータが読み込まれない

**解決方法**
```bash
# 1. 環境変数を確認
cat .env.local

# 2. 手動でデータ取得を実行
npm run fetch-airtable

# 3. エラーメッセージを確認
# APIキーの権限を確認
# Base IDとTable名が正しいか確認
```

### CORS エラー

**症状**
```
Access to fetch at 'https://api.airtable.com/...' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**解決方法**
```javascript
// クライアントサイドではなく、サーバーサイドで取得
// pages/api/sessions.ts などのAPIルートを使用

// または、ビルド時に静的ファイルとして生成
// scripts/fetch-airtable-data.js を使用
```

### レート制限エラー

**症状**
```
Error: RATE_LIMIT_REACHED
```

**解決方法**
```javascript
// リクエスト間隔を調整
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// バッチ処理
for (const batch of chunks(records, 10)) {
  await processBatch(batch);
  await delay(1000); // 1秒待機
}
```

## 📄 GitHub Pages関連

### 404エラー（ルーティング）

**症状**
直接URLアクセスで404エラー

**解決方法**
```javascript
// next.config.js
module.exports = {
  basePath: '/henkaku-ai-archive',
  assetPrefix: '/henkaku-ai-archive/',
  trailingSlash: true, // 末尾スラッシュを追加
}
```

### 画像が表示されない

**症状**
GitHub Pagesで画像が404

**解決方法**
```javascript
// 相対パスではなく、basePathを含む絶対パスを使用
// ❌ 悪い例
<img src="/images/logo.svg" />

// ✅ 良い例
<img src="/henkaku-ai-archive/images/logo.svg" />

// または Next.js の Image コンポーネントを使用
import Image from 'next/image';
<Image src="/images/logo.svg" alt="Logo" width={100} height={100} />
```

### デプロイ後の更新が反映されない

**症状**
GitHubにプッシュしても変更が見えない

**解決方法**
```bash
# 1. GitHub Actionsの状態を確認
# https://github.com/sparkminan/henkaku-ai-archive/actions

# 2. ブラウザキャッシュをクリア
# Ctrl + Shift + R (Windows/Linux)
# Cmd + Shift + R (Mac)

# 3. CDNキャッシュの場合は時間を置く（5-10分）
```

## ⚡ パフォーマンスの問題

### 初回読み込みが遅い

**症状**
ページの初回表示に時間がかかる

**解決方法**
```javascript
// 1. 動的インポートを使用
const HeavyComponent = dynamic(() => import('../components/HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false,
});

// 2. 画像の最適化
// - WebP形式を使用
// - 適切なサイズにリサイズ
// - loading="lazy"を追加

// 3. 不要な依存関係を削除
npm list --depth=0
# 使用していないパッケージを削除
```

### メモリリーク

**症状**
長時間使用でページが重くなる

**解決方法**
```javascript
// useEffectのクリーンアップを確認
useEffect(() => {
  const timer = setInterval(() => {
    // 処理
  }, 1000);

  // クリーンアップ関数を必ず返す
  return () => clearInterval(timer);
}, []);

// イベントリスナーの削除
useEffect(() => {
  const handleScroll = () => { /* ... */ };
  window.addEventListener('scroll', handleScroll);
  
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

## 🤔 その他の問題

### ESLintエラー

**症状**
```
'React' must be in scope when using JSX
```

**解決方法**
```javascript
// Next.js 12以降では自動インポートされるため不要
// .eslintrc.jsonに以下を追加
{
  "rules": {
    "react/react-in-jsx-scope": "off"
  }
}
```

### Git関連の問題

**症状**
改行コードの警告
```
warning: LF will be replaced by CRLF
```

**解決方法**
```bash
# Gitの改行コード設定
git config core.autocrlf true  # Windows
git config core.autocrlf input # Mac/Linux

# .gitattributesファイルで統一
echo "* text=auto" > .gitattributes
```

### 日本語の文字化け

**症状**
日本語が正しく表示されない

**解決方法**
```html
<!-- _document.tsx で文字エンコーディングを設定 -->
<Head>
  <meta charSet="utf-8" />
</Head>

<!-- JSONファイルはUTF-8で保存 -->
<!-- VSCodeの右下のエンコーディング表示で確認 -->
```

## 📞 それでも解決しない場合

1. **エラーメッセージで検索**
   - エラーメッセージをそのままGoogle検索
   - Stack Overflowで類似の問題を探す

2. **公式ドキュメント確認**
   - [Next.js Docs](https://nextjs.org/docs)
   - [React Docs](https://react.dev/)
   - [TailwindCSS Docs](https://tailwindcss.com/docs)

3. **コミュニティに質問**
   - [GitHub Issues](https://github.com/sparkminan/henkaku-ai-archive/issues)
   - [HENKAKU Discord](https://discord.gg/henkaku)
   - 詳細なエラー情報と再現手順を記載

4. **最小限の再現コードを作成**
   ```javascript
   // 問題を再現する最小限のコード例を作成
   // これにより問題の特定が容易になります
   ```

---

このガイドは随時更新されます。新しい問題と解決方法を見つけた場合は、ぜひコントリビューションしてください！