// Airtable接続テストスクリプト
const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

async function testAirtableConnection() {
  console.log('=== Airtable Connection Test ===\n');
  
  // 環境変数の確認
  console.log('1. 環境変数の確認:');
  console.log(`   AIRTABLE_API_KEY: ${process.env.AIRTABLE_API_KEY ? '設定済み (長さ: ' + process.env.AIRTABLE_API_KEY.length + ')' : '未設定'}`);
  console.log(`   AIRTABLE_BASE_ID: ${process.env.AIRTABLE_BASE_ID || '未設定'}`);
  console.log(`   AIRTABLE_SESSIONS_TABLE_NAME: ${process.env.AIRTABLE_SESSIONS_TABLE_NAME || 'Sessions'}\n`);

  if (!process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_API_KEY === 'your_api_key_here') {
    console.error('❌ エラー: AIRTABLE_API_KEY が設定されていません');
    return;
  }
  
  if (!process.env.AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID === 'your_base_id_here') {
    console.error('❌ エラー: AIRTABLE_BASE_ID が設定されていません');
    return;
  }

  try {
    console.log('2. Airtableへの接続テスト...');
    
    // Airtable初期化
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base(process.env.AIRTABLE_BASE_ID);

    // テーブル一覧を取得（エラーが出る場合は認証情報に問題あり）
    console.log('3. セッションデータの取得...');
    
    const records = await base(process.env.AIRTABLE_SESSIONS_TABLE_NAME || 'Sessions')
      .select({
        maxRecords: 3,
        view: 'Grid view'
      })
      .firstPage();

    console.log(`\n✅ 成功: ${records.length} 件のレコードを取得しました\n`);
    
    // 最初のレコードの構造を確認
    if (records.length > 0) {
      console.log('4. レコード構造の確認 (最初のレコード):');
      const fields = records[0].fields;
      console.log('   利用可能なフィールド:');
      Object.keys(fields).forEach(key => {
        const value = fields[key];
        const preview = typeof value === 'string' && value.length > 50 
          ? value.substring(0, 50) + '...' 
          : value;
        console.log(`   - ${key}: ${preview}`);
      });
    }
    
  } catch (error) {
    console.error('\n❌ エラーが発生しました:');
    console.error(`   タイプ: ${error.error || error.name}`);
    console.error(`   メッセージ: ${error.message}`);
    
    if (error.statusCode) {
      console.error(`   ステータスコード: ${error.statusCode}`);
      
      switch (error.statusCode) {
        case 401:
          console.error('\n   → API Keyが無効です。正しいキーか確認してください。');
          break;
        case 403:
          console.error('\n   → アクセス権限がありません。トークンのスコープを確認してください。');
          break;
        case 404:
          console.error('\n   → Base IDまたはTable名が正しくありません。');
          break;
        case 422:
          console.error('\n   → リクエストが無効です。テーブル名やビュー名を確認してください。');
          break;
      }
    }
  }
}

// スクリプトを実行
testAirtableConnection();