import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchSessionById } from '../../../lib/airtable';
import { sessionsData } from '../../../data/sessions';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid session ID' });
  }

  try {
    // Try to fetch from Airtable
    const airtableSession = await fetchSessionById(id);
    
    if (airtableSession) {
      return res.status(200).json(airtableSession);
    }
    
    // Fallback to static data if Airtable is not configured or fails
    const session = sessionsData.find(s => s.id === id);
    if (session) {
      return res.status(200).json(session);
    }
    
    return res.status(404).json({ error: 'Session not found' });
  } catch (error) {
    console.error('Error in session API:', error);
    // Fallback to static data
    const session = sessionsData.find(s => s.id === id);
    if (session) {
      return res.status(200).json(session);
    }
    return res.status(404).json({ error: 'Session not found' });
  }
}