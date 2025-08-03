import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchSessions } from '../../lib/airtable';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Airtableの設定状態を確認
    const hasApiKey = !!process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_API_KEY !== 'your_api_key_here';
    const hasBaseId = !!process.env.AIRTABLE_BASE_ID && process.env.AIRTABLE_BASE_ID !== 'your_base_id_here';
    
    if (!hasApiKey || !hasBaseId) {
      return res.status(200).json({
        status: 'not_configured',
        message: 'Airtable is not configured. Please set AIRTABLE_API_KEY and AIRTABLE_BASE_ID in .env.local',
        config: {
          hasApiKey,
          hasBaseId,
          tableName: process.env.AIRTABLE_SESSIONS_TABLE_NAME || 'Sessions'
        }
      });
    }

    // Airtableからデータを取得
    const sessions = await fetchSessions();
    
    if (sessions) {
      return res.status(200).json({
        status: 'success',
        message: 'Successfully connected to Airtable',
        data: {
          sessionCount: sessions.length,
          firstSession: sessions[0] || null
        }
      });
    } else {
      return res.status(200).json({
        status: 'error',
        message: 'Failed to fetch data from Airtable',
        config: {
          hasApiKey,
          hasBaseId,
          tableName: process.env.AIRTABLE_SESSIONS_TABLE_NAME || 'Sessions'
        }
      });
    }
  } catch (error) {
    console.error('Error testing Airtable connection:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error testing Airtable connection',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}