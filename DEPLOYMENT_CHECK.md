# デプロイメント確認手順

## 1. GitHub Actions の確認

1. https://github.com/sparkminan/henkaku-ai-archive/actions にアクセス
2. 最新のワークフローが成功（緑のチェック）しているか確認
3. 失敗している場合は、ワークフローをクリックしてエラーログを確認

## 2. GitHub Pages 設定の確認

1. https://github.com/sparkminan/henkaku-ai-archive/settings/pages にアクセス
2. **Source** が `GitHub Actions` になっているか確認
3. サイトのURLが表示されているか確認

## 3. ブラウザキャッシュのクリア

デプロイは成功しているが、ブラウザキャッシュのため古いバージョンが表示されることがあります：

### Windows/Linux
- Ctrl + F5（強制リロード）
- Ctrl + Shift + Delete → キャッシュをクリア

### Mac
- Cmd + Shift + R（強制リロード）
- Cmd + Shift + Delete → キャッシュをクリア

### または
- シークレット/プライベートウィンドウで開く
- 別のブラウザで試す

## 4. デプロイの遅延

GitHub Pages のデプロイは通常1-2分で完了しますが、時に10分程度かかることがあります。

## 5. 直接ファイルを確認

特定のファイルが更新されているか確認：
- https://sparkminan.github.io/henkaku-ai-archive/favicon.svg
- https://sparkminan.github.io/henkaku-ai-archive/

## 6. トラブルシューティング

### ワークフローが失敗している場合
```bash
# ローカルでビルドテスト
npm run build

# エラーがある場合は修正してから再プッシュ
```

### 404エラーの場合
- GitHub Pages の設定を確認
- next.config.js の basePath 設定を確認

### 特定のページだけ更新されない場合
- そのページのビルドエラーがないか確認
- コンソールエラーを確認（F12）