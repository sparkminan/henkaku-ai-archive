import { useState, useEffect } from 'react';
import { StudySession } from '../types';
import { fetchSessionsFromAirtable } from '../lib/airtable-api';

export function useAirtableSessions() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Fetching sessions from Airtable API...');
        const sessionsData = await fetchSessionsFromAirtable();
        setSessions(sessionsData);
        console.log(`Successfully loaded ${sessionsData.length} sessions`);
      } catch (err) {
        console.error('Error fetching sessions:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch sessions');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { sessions, loading, error };
}

export function useAirtableSession(id: string) {
  const [session, setSession] = useState<StudySession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log(`Fetching session ${id} from Airtable API...`);
        const sessionsData = await fetchSessionsFromAirtable();
        const foundSession = sessionsData.find(s => s.id === id);
        setSession(foundSession || null);
        console.log(`Session ${id}:`, foundSession ? 'found' : 'not found');
      } catch (err) {
        console.error('Error fetching session:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch session');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return { session, loading, error };
}