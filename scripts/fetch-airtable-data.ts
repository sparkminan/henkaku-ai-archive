// TypeScript version of the Airtable data fetcher
import { AirtableClient } from '../src/lib/airtable-client';
import { StudySession } from '../src/types';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function fetchAndSaveAirtableData() {
  console.log('Fetching data from Airtable...');
  
  // Check environment variables
  if (!process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_API_KEY === 'your_api_key_here') {
    console.warn('AIRTABLE_API_KEY is not set. Using static data.');
    return;
  }
  
  if (!process.env.AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID === 'your_base_id_here') {
    console.warn('AIRTABLE_BASE_ID is not set. Using static data.');
    return;
  }

  try {
    // Initialize Airtable client
    const client = new AirtableClient({
      apiKey: process.env.AIRTABLE_API_KEY,
      baseId: process.env.AIRTABLE_BASE_ID,
      tableName: process.env.AIRTABLE_SESSIONS_TABLE_NAME || 'Sessions',
    });

    // Fetch all sessions
    const sessions = await client.fetchAll();

    // Save to JSON file
    const outputPath = path.join(__dirname, '..', 'src', 'data', 'airtable-sessions.json');
    fs.writeFileSync(outputPath, JSON.stringify(sessions, null, 2));

    console.log(`Successfully fetched ${sessions.length} sessions from Airtable`);
    console.log(`Data saved to: ${outputPath}`);

    // Also save a timestamp file for tracking last update
    const timestampPath = path.join(__dirname, '..', 'src', 'data', 'last-airtable-update.json');
    fs.writeFileSync(timestampPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      count: sessions.length
    }, null, 2));

  } catch (error: any) {
    console.error('Error fetching from Airtable:', error);
    
    if (error.message?.includes('401')) {
      console.error('Authentication failed. Please check your API key.');
    } else if (error.message?.includes('403')) {
      console.error('Access denied. Please check your permissions and base ID.');
    } else if (error.message?.includes('404')) {
      console.error('Base or table not found. Please check your configuration.');
    }
    
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  fetchAndSaveAirtableData();
}

export { fetchAndSaveAirtableData };