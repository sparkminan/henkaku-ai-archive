# Airtable Setup Guide

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

## セキュリティ注意事項
- `.env.local` ファイルは絶対にGitにコミットしないでください
- API Keyは公開しないよう注意してください
- 本番環境では環境変数を適切に管理してください