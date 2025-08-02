# GitHub Pages 設定ガイド

## GitHub リポジトリでの設定手順

### 1. GitHub Pages を有効化

1. GitHubリポジトリ（https://github.com/sparkminan/henkaku-ai-archive）を開く
2. **Settings** タブをクリック
3. 左側メニューの **Pages** をクリック

### 2. Pages の設定

**Source（ソース）** セクションで以下を設定：

- **Source**: `GitHub Actions` を選択
  - ⚠️ **重要**: `Deploy from a branch` ではなく `GitHub Actions` を選択してください

設定は自動的に保存されます。

### 3. 設定確認

設定後、以下を確認：

1. **Actions** タブを開く
2. 最新のワークフローが実行されているか確認
3. ワークフローが成功（緑のチェックマーク）しているか確認

### 4. サイトの確認

デプロイ完了後（通常1-2分）、以下のURLでアクセス可能になります：

```
https://sparkminan.github.io/henkaku-ai-archive/
```

## トラブルシューティング

### サイトが404エラーになる場合

1. **GitHub Pages の Source 設定を確認**
   - 必ず `GitHub Actions` が選択されていることを確認

2. **Actions の実行状況を確認**
   - Actions タブで最新のワークフローが成功しているか確認
   - 失敗している場合はログを確認

3. **ブランチを確認**
   - `main` ブランチにコードがプッシュされているか確認

### ビルドエラーが発生する場合

1. **package-lock.json が存在するか確認**
   ```bash
   npm install
   git add package-lock.json
   git commit -m "Add package-lock.json"
   git push
   ```

2. **依存関係のエラー**
   - ローカルで `npm run build` が成功するか確認

### スタイルが適用されない場合

1. **basePath の設定を確認**
   - `next.config.js` の `basePath` が正しく設定されているか確認
   - 現在の設定: `/henkaku-ai-archive`

2. **キャッシュをクリア**
   - ブラウザのキャッシュをクリア
   - シークレットウィンドウで確認

## 現在の設定内容

### next.config.js
```javascript
basePath: process.env.NODE_ENV === 'production' ? '/henkaku-ai-archive' : '',
assetPrefix: process.env.NODE_ENV === 'production' ? '/henkaku-ai-archive' : '',
output: 'export'
```

### GitHub Actions Workflow
- ビルド: `npm run build`
- 出力ディレクトリ: `./out`
- デプロイ先: GitHub Pages

## 設定チェックリスト

- [ ] GitHub Pages の Source が `GitHub Actions` に設定されている
- [ ] Actions ワークフローが成功している
- [ ] `https://sparkminan.github.io/henkaku-ai-archive/` でアクセスできる
- [ ] すべてのページが正しく表示される
- [ ] スタイルが正しく適用されている
- [ ] 画像が正しく表示される