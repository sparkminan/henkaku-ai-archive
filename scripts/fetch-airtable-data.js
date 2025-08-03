// Airtableからデータを取得してJSONファイルとして保存するスクリプト
const Airtable = require('airtable');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function fetchAndSaveAirtableData() {
  console.log('Fetching data from Airtable...');
  
  // 環境変数の確認
  if (!process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_API_KEY === 'your_api_key_here') {
    console.warn('AIRTABLE_API_KEY is not set. Using static data.');
    return;
  }
  
  if (!process.env.AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID === 'your_base_id_here') {
    console.warn('AIRTABLE_BASE_ID is not set. Using static data.');
    return;
  }

  try {
    // Airtable初期化
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base(process.env.AIRTABLE_BASE_ID);

    // セッションデータを取得
    const records = await base(process.env.AIRTABLE_SESSIONS_TABLE_NAME || 'Sessions')
      .select({
        view: 'Grid view',
        sort: [{ field: 'ID', direction: 'desc' }]
      })
      .all();

    // データを変換
    const sessions = records.map(record => {
      const fields = record.fields;
      return {
        id: fields.ID,
        title: fields.Title,
        date: fields.Date,
        presenter: fields.Presenter,
        description: fields.Description,
        tags: fields.Tags ? fields.Tags.split(';').map(tag => tag.trim()) : [],
        thumbnailUrl: fields.ThumbnailURL,
        podcastUrl: fields.PodcastURL || undefined,
        videoUrl: fields.VideoURL || undefined,
        status: fields.Status,
        materials: fields.Materials ? fields.Materials.split(',').map(m => m.trim()) : []
      };
    });

    // JSONファイルとして保存
    const outputPath = path.join(__dirname, '..', 'src', 'data', 'airtable-sessions.json');
    fs.writeFileSync(outputPath, JSON.stringify(sessions, null, 2));
    
    console.log(`Successfully fetched ${sessions.length} sessions from Airtable`);
    console.log(`Data saved to: ${outputPath}`);
    
    // ビルド時に使用するフラグファイルを作成
    const flagPath = path.join(__dirname, '..', 'src', 'data', '.use-airtable');
    fs.writeFileSync(flagPath, 'true');
    
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
    process.exit(1);
  }
}

// スクリプトを実行
fetchAndSaveAirtableData();