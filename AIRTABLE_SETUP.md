# Airtable Setup Guide

## データのアップロード

1. Airtableにログイン
2. 新しいBaseを作成または既存のBaseを選択
3. `airtable_sessions_optimized.csv` をインポート
4. テーブル名を `Sessions` に設定

## 必要な情報の取得方法

### 1. API Key の取得
1. [Airtable Account](https://airtable.com/account) にアクセス
2. 「API」セクションを探す
3. 「Personal access tokens」をクリック
4. 新しいトークンを作成（必要なスコープ: `data.records:read`）

### 2. Base ID の取得
1. Airtableでデータベースを開く
2. URLを確認: `https://airtable.com/appXXXXXXXXXXXXXX/tblYYYYYYYYYYYYYY`
3. `appXXXXXXXXXXXXXX` の部分がBase ID

### 3. .env.local の設定
`.env.local` ファイルに以下の情報を設定してください：

```env
AIRTABLE_API_KEY=patXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_SESSIONS_TABLE_NAME=Sessions
```

## テスト方法

1. 開発サーバーを起動:
   ```bash
   npm run dev
   ```

2. ブラウザで以下のURLにアクセス:
   ```
   http://localhost:3000/api/test-airtable
   ```

3. 接続が成功すると、セッション数が表示されます

## 本番環境へのデプロイ

### Vercelを使用する場合
1. Vercelのプロジェクト設定で環境変数を追加
2. `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `AIRTABLE_SESSIONS_TABLE_NAME` を設定

### GitHub Pagesを使用する場合
**注意**: GitHub Pagesは静的サイトホスティングのため、APIルートは動作しません。
代替方法:
1. VercelまたはNetlifyを使用
2. ビルド時にAirtableデータを静的に生成

## セキュリティ注意事項
- `.env.local` ファイルは絶対にGitにコミットしないでください
- API Keyは公開しないよう注意してください
- 本番環境では環境変数を適切に管理してください