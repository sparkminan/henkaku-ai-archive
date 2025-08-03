# 🚀 Google Apps Script (GAS) セットアップガイド

HENKAKU AI Archive のリアルタイムAirtable統合用のGAS APIを設定する手順です。

## 📋 事前準備

- Googleアカウント
- AirtableのAPI Key
- AirtableのBase ID

## 🔧 GAS プロジェクトの作成

### 1. Google Apps Script にアクセス
https://script.google.com/ にアクセスしてログイン

### 2. 新しいプロジェクトを作成
- 「新しいプロジェクト」をクリック
- プロジェクト名を「HENKAKU-Airtable-Proxy」に変更

### 3. スクリプトコードを貼り付け
- デフォルトの `Code.gs` を削除
- `gas-scripts/airtable-proxy.js` の内容をすべてコピー&ペースト

## 🔐 環境変数の設定

### 1. プロジェクト設定を開く
- 左メニューの「プロジェクトの設定」（⚙️アイコン）をクリック

### 2. スクリプト プロパティを追加
「スクリプト プロパティ」セクションで以下を追加：

| キー | 値 |
|-----|-----|
| `AIRTABLE_API_KEY` | `patmkYaRajulCUFNP.aa04f26e09eedf369beadfd31efc58553a3716de9074ba92e03f2efaca36c19c` |
| `AIRTABLE_BASE_ID` | `appXs1nJwF75AVJfV` |

## 🧪 テスト実行

### 1. テスト関数を実行
- 関数選択ドロップダウンで `testAirtableFetch` を選択
- 「実行」ボタンをクリック
- 初回実行時は権限を許可

### 2. 実行ログを確認
- 「実行数」をクリックしてログを確認
- `✅ Test successful!` が表示されればOK

## 🌐 Web App として公開

### 1. デプロイを作成
- 右上の「デプロイ」ボタンをクリック
- 「新しいデプロイ」を選択

### 2. デプロイ設定
- **種類**: ウェブアプリ
- **説明**: HENKAKU Airtable Proxy API
- **実行ユーザー**: 自分
- **アクセスできるユーザー**: 全員

### 3. デプロイを実行
- 「デプロイ」ボタンをクリック
- **Web アプリのURL** をコピーして保存
  
  例: `https://script.google.com/macros/s/AKfycby.../exec`

## 🔧 GitHub Pages プロジェクトの更新

### 1. 環境変数ファイルを更新
`.env.local` に以下を追加：

```bash
# GAS API Configuration
NEXT_PUBLIC_GAS_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### 2. 本番環境用設定
GitHub Actions の環境変数にも同じURLを設定

## ✅ 動作確認

### 1. GAS API を直接テスト
ブラウザで GAS URL にアクセス:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

レスポンス例:
```json
{
  "success": true,
  "data": [...],
  "timestamp": "2025-08-03T...",
  "source": "GAS-Airtable-Proxy"
}
```

### 2. GitHub Pages での確認
デプロイ後、サイトでリアルタイムデータが表示されることを確認

## 🚨 トラブルシューティング

### エラー: `Exception: Airtable credentials not configured`
→ スクリプト プロパティが正しく設定されているか確認

### エラー: `HTTP 401 Unauthorized`
→ Airtable API Keyが間違っているか期限切れ

### エラー: `CORS エラー`
→ GAS の doOptions 関数が正しく実装されているか確認

## 🎯 利点

✅ **完全無料**: GAS は無料で利用可能  
✅ **高信頼性**: Google のインフラを使用  
✅ **CORS 対応**: クロスオリジン問題を完全解決  
✅ **セキュア**: API キーはGAS内で安全に管理  
✅ **リアルタイム**: Airtable の変更が即座に反映  
✅ **メンテナンス不要**: Google が自動でメンテナンス