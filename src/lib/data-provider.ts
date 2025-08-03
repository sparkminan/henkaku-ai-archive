import { StudySession } from '@/types';
import { fetchSessions as fetchAirtableSessions, fetchSessionById as fetchAirtableSessionById } from './airtable';
import { loadAllSessions } from '@/utils/dataLoader';

export interface DataProvider {
  fetchAllSessions(): Promise<StudySession[]>;
  fetchSessionById(id: string): Promise<StudySession | null>;
  subscribeToChanges?(callback: (sessions: StudySession[]) => void): () => void;
}

class AirtableDataProvider implements DataProvider {
  async fetchAllSessions(): Promise<StudySession[]> {
    // In production, always try to use the fetched Airtable data first
    if (process.env.NODE_ENV === 'production') {
      const staticSessions = await this.fetchStaticSessions();
      if (staticSessions.length > 0) {
        return staticSessions;
      }
    }
    
    // In development, try to fetch from Airtable API
    const sessions = await fetchAirtableSessions();
    if (!sessions) {
      // Fall back to static data
      return this.fetchStaticSessions();
    }
    return sessions;
  }

  async fetchSessionById(id: string): Promise<StudySession | null> {
    const session = await fetchAirtableSessionById(id);
    if (!session) {
      // Fall back to static data
      const staticSessions = await this.fetchStaticSessions();
      return staticSessions.find(s => s.id === id) || null;
    }
    return session;
  }

  private async fetchStaticSessions(): Promise<StudySession[]> {
    // Since we're in the browser, we can't use file system access
    // Instead, import the JSON data directly
    try {
      const airtableData = await import('@/data/airtable-sessions.json');
      // Convert id from number to string
      return airtableData.default.map((session: any) => ({
        ...session,
        id: String(session.id)
      }));
    } catch (error) {
      console.warn('Failed to load airtable-sessions.json:', error);
    }

    // Fall back to static sessions
    return loadAllSessions();
  }

  subscribeToChanges(callback: (sessions: StudySession[]) => void): () => void {
    // Poll for changes every minute
    const interval = setInterval(async () => {
      const sessions = await this.fetchAllSessions();
      callback(sessions);
    }, 60000);

    return () => clearInterval(interval);
  }
}

class StaticDataProvider implements DataProvider {
  async fetchAllSessions(): Promise<StudySession[]> {
    return loadAllSessions();
  }

  async fetchSessionById(id: string): Promise<StudySession | null> {
    const sessions = await this.fetchAllSessions();
    return sessions.find(s => s.id === id) || null;
  }
}

// Factory function to create the appropriate data provider
export function createDataProvider(): DataProvider {
  // Always use AirtableDataProvider which has fallback logic
  return new AirtableDataProvider();
}

// Singleton instance
let dataProviderInstance: DataProvider | null = null;

export function getDataProvider(): DataProvider {
  if (!dataProviderInstance) {
    dataProviderInstance = createDataProvider();
  }
  return dataProviderInstance;
}