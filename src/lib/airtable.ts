import { AirtableClient } from './airtable-client';
import { StudySession } from '@/types';

// Initialize Airtable client
let client: AirtableClient | null = null;

if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
  try {
    client = new AirtableClient({
      apiKey: process.env.AIRTABLE_API_KEY,
      baseId: process.env.AIRTABLE_BASE_ID,
      tableName: process.env.AIRTABLE_SESSIONS_TABLE_NAME || 'Sessions',
    });
  } catch (error) {
    console.warn('Failed to initialize Airtable client:', error);
  }
}

// Re-export client for direct access if needed
export { client as airtableClient };

// Fetch all sessions
export async function fetchSessions(): Promise<StudySession[] | null> {
  if (!client) {
    console.warn('Airtable is not configured, using fallback data');
    return null;
  }

  try {
    return await client.fetchAll();
  } catch (error) {
    console.error('Error fetching sessions from Airtable:', error);
    return null;
  }
}

// Fetch specific session by ID
export async function fetchSessionById(id: string): Promise<StudySession | null> {
  if (!client) {
    console.warn('Airtable is not configured, using fallback data');
    return null;
  }

  try {
    return await client.fetchById(id);
  } catch (error) {
    console.error('Error fetching session from Airtable:', error);
    return null;
  }
}

// Fetch recent sessions
export async function fetchRecentSessions(limit: number = 10): Promise<StudySession[] | null> {
  if (!client) {
    return null;
  }

  try {
    return await client.fetchRecent(limit);
  } catch (error) {
    console.error('Error fetching recent sessions:', error);
    return null;
  }
}

// Fetch sessions by tags
export async function fetchSessionsByTags(tags: string[]): Promise<StudySession[] | null> {
  if (!client) {
    return null;
  }

  try {
    return await client.fetchByTags(tags);
  } catch (error) {
    console.error('Error fetching sessions by tags:', error);
    return null;
  }
}

// Subscribe to changes (for real-time updates)
export function subscribeToSessionChanges(callback: (sessions: StudySession[]) => void): () => void {
  if (!client) {
    return () => {};
  }

  return client.subscribeToChanges(callback);
}