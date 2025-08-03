import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchSessions } from '../../lib/airtable';
import { sessionsData } from '../../data/sessionsData';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Try to fetch from Airtable
    const airtableSessions = await fetchSessions();
    
    if (airtableSessions) {
      return res.status(200).json(airtableSessions);
    }
    
    // Fallback to static data if Airtable is not configured or fails
    return res.status(200).json(sessionsData);
  } catch (error) {
    console.error('Error in sessions API:', error);
    // Fallback to static data
    return res.status(200).json(sessionsData);
  }
}