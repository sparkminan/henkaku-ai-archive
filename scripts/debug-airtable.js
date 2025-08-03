// Airtableデバッグスクリプト
const https = require('https');
require('dotenv').config({ path: '.env.local' });

console.log('=== Airtable Debug Info ===\n');

// 環境変数の確認
console.log('1. Environment Variables:');
console.log(`   API Key length: ${process.env.AIRTABLE_API_KEY?.length || 0}`);
console.log(`   Base ID: ${process.env.AIRTABLE_BASE_ID}`);
console.log(`   Table: ${process.env.AIRTABLE_SESSIONS_TABLE_NAME}\n`);

// 直接APIを呼び出してみる
const options = {
  hostname: 'api.airtable.com',
  path: `/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_SESSIONS_TABLE_NAME}?maxRecords=1`,
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json'
  }
};

console.log('2. Making API request to:');
console.log(`   https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_SESSIONS_TABLE_NAME}\n`);

const req = https.request(options, (res) => {
  console.log(`3. Response Status: ${res.statusCode}`);
  console.log(`   Status Message: ${res.statusMessage}\n`);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('4. Response:', JSON.stringify(response, null, 2));
      
      if (response.error) {
        console.log('\n5. Error Details:');
        console.log(`   Type: ${response.error.type}`);
        console.log(`   Message: ${response.error.message}`);
      }
    } catch (e) {
      console.log('4. Raw Response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
});

req.end();