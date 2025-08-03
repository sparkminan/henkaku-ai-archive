# GitHub Secrets Setup for Airtable Integration

## GitHub Secretsの設定方法

1. GitHubリポジトリページを開く
2. 「Settings」タブをクリック
3. 左サイドバーの「Secrets and variables」→「Actions」をクリック
4. 「New repository secret」ボタンをクリック

## 必要なSecrets

### 1. AIRTABLE_API_KEY
- **Name**: `AIRTABLE_API_KEY`
- **Value**: Airtableのパーソナルアクセストークン
- 取得方法:
  1. [Airtable Account](https://airtable.com/account) にアクセス
  2. 「API」セクションから「Personal access tokens」をクリック
  3. 新しいトークンを作成（スコープ: `data.records:read`）

### 2. AIRTABLE_BASE_ID
- **Name**: `AIRTABLE_BASE_ID`
- **Value**: AirtableのBase ID（例: `appXXXXXXXXXXXXXX`）
- 取得方法:
  1. Airtableでデータベースを開く
  2. URLから確認: `https://airtable.com/appXXXXXXXXXXXXXX/tblYYYYYYYYYYYYYY`
  3. `appXXXXXXXXXXXXXX` の部分がBase ID

## 動作確認

1. Secretsを設定後、GitHubにコードをプッシュ
2. 「Actions」タブでワークフローの実行を確認
3. 「Fetch Airtable data」ステップが成功することを確認

## トラブルシューティング

### Airtableデータが反映されない場合
1. GitHub Actionsのログを確認
2. Secretsが正しく設定されているか確認
3. Airtableのアクセス権限を確認

### ローカル開発環境で確認
```bash
# .env.localに認証情報を設定
AIRTABLE_API_KEY=your_api_key
AIRTABLE_BASE_ID=your_base_id

# データ取得スクリプトを実行
npm run fetch-airtable

# 開発サーバーで確認
npm run dev
```