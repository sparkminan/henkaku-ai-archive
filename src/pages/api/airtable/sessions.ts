import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_SESSIONS_TABLE_NAME || 'Sessions';

    if (!apiKey || !baseId) {
      return res.status(500).json({ error: 'Airtable credentials not configured' });
    }

    const airtableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}?sort%5B0%5D%5Bfield%5D=ID&sort%5B0%5D%5Bdirection%5D=desc`;
    
    const response = await fetch(airtableUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Airtable API Error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: 'Failed to fetch from Airtable',
        details: errorText 
      });
    }

    const data = await response.json();
    res.status(200).json(data);
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}