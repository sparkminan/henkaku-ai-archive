# Airtable セットアップガイド

このプロジェクトでAirtableをデータソースとして使用するための設定方法です。

## GitHub Secretsの設定（重要）

GitHub ActionsでAirtableからデータを取得するには、以下のSecretを設定する必要があります：

1. GitHubリポジトリの **Settings** → **Secrets and variables** → **Actions** にアクセス

2. **New repository secret** をクリックして以下を追加：
   - `AIRTABLE_API_KEY`: AirtableのPersonal Access Token
   - `AIRTABLE_BASE_ID`: AirtableのBase ID（例：appXXXXXXXXXXXXXX）

## Airtable Personal Access Tokenの取得方法

1. https://airtable.com/create/tokens にアクセス
2. **Create new token** をクリック
3. 以下の設定を行う：
   - **Name**: 任意の名前（例：henkaku-ai-archive）
   - **Scopes**: 
     - `data.records:read` を選択
   - **Access**: 
     - 対象のBaseを選択
4. **Create token** をクリックしてトークンをコピー

## Base IDの確認方法

1. Airtableで対象のBaseを開く
2. URLを確認：`https://airtable.com/appXXXXXXXXXXXXXX/...`
3. `appXXXXXXXXXXXXXX` の部分がBase ID

## ローカル開発環境

`.env.local`ファイルに以下を設定：

```
AIRTABLE_API_KEY=your_personal_access_token
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_SESSIONS_TABLE_NAME=Sessions
```

## トラブルシューティング

### GitHub Actionsでデータが取得できない場合

1. GitHub Actionsのログを確認
2. Secretsが正しく設定されているか確認
3. Personal Access Tokenのスコープと権限を確認

### ローカルでデータが取得できない場合

```bash
node scripts/fetch-airtable-data.js
```

このコマンドでエラーメッセージを確認してください。