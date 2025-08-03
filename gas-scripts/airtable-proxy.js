/**
 * HENKAKU AI Archive - Airtable Proxy via Google Apps Script
 * GitHub Pages対応のリアルタイムデータ取得用API
 */

// GASプロジェクトの設定で環境変数として設定してください
const AIRTABLE_API_KEY = PropertiesService.getScriptProperties().getProperty('AIRTABLE_API_KEY');
const AIRTABLE_BASE_ID = PropertiesService.getScriptProperties().getProperty('AIRTABLE_BASE_ID');
const AIRTABLE_SESSIONS_TABLE_NAME = 'Sessions';

/**
 * Web App エントリーポイント
 * GET: /exec でセッションデータを取得
 */
function doGet(e) {
  try {
    console.log('🚀 GAS API called for sessions data');
    
    // CORS ヘッダーを設定
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    // Airtableからセッションデータを取得
    const sessions = fetchSessionsFromAirtable();
    
    console.log(`✅ Successfully returned ${sessions.length} sessions`);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        data: sessions,
        timestamp: new Date().toISOString(),
        source: 'GAS-Airtable-Proxy'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ GAS API Error:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * OPTIONS リクエスト対応（CORS preflight）
 */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
}

/**
 * Airtableからセッションデータを取得
 */
function fetchSessionsFromAirtable() {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    throw new Error('Airtable credentials not configured in GAS Properties');
  }
  
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_SESSIONS_TABLE_NAME}?sort%5B0%5D%5Bfield%5D=ID&sort%5B0%5D%5Bdirection%5D=desc`;
  
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  
  console.log('📡 Fetching from Airtable...');
  const response = UrlFetchApp.fetch(url, options);
  
  if (response.getResponseCode() !== 200) {
    throw new Error(`Airtable API Error: ${response.getResponseCode()} - ${response.getContentText()}`);
  }
  
  const data = JSON.parse(response.getContentText());
  
  // データを整形してStudySession形式に変換
  const sessions = data.records.map(record => ({
    id: record.fields.ID.toString(),
    title: record.fields.Title,
    date: record.fields.Date,
    presenter: record.fields.Presenter,
    description: record.fields.Description,
    tags: record.fields.Tags ? record.fields.Tags.split(';').map(tag => tag.trim()) : [],
    thumbnailUrl: record.fields.ThumbnailURL,
    podcastUrl: record.fields.PodcastURL || undefined,
    videoUrl: record.fields.VideoURL || undefined,
    status: record.fields.Status,
    materials: [] // 現在は未使用
  }));
  
  console.log(`📊 Formatted ${sessions.length} sessions`);
  return sessions;
}

/**
 * テスト用関数（GASエディタで実行可能）
 */
function testAirtableFetch() {
  try {
    const sessions = fetchSessionsFromAirtable();
    console.log('✅ Test successful!');
    console.log(`Sessions count: ${sessions.length}`);
    console.log('First session:', sessions[0]);
    return sessions;
  } catch (error) {
    console.error('❌ Test failed:', error);
    throw error;
  }
}