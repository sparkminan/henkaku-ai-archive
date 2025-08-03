import { useState, useEffect } from 'react';
import { StudySession } from '../types';

export function useAirtableSessions() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // GitHub Pages環境では静的JSONファイルを直接読み込む
        const response = await fetch('/henkaku-ai-archive/data/airtable-sessions.json');
        
        if (!response.ok) {
          throw new Error('Failed to fetch sessions');
        }
        
        const data = await response.json();
        // データの形式を整形（idを文字列に変換）
        const formattedSessions = data.map((session: any) => ({
          ...session,
          id: session.id.toString(),
          materials: session.materials || []
        }));
        setSessions(formattedSessions);
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
        // GitHub Pages環境では静的JSONファイルを直接読み込む
        const response = await fetch('/henkaku-ai-archive/data/airtable-sessions.json');
        
        if (!response.ok) {
          throw new Error('Failed to fetch sessions');
        }
        
        const data = await response.json();
        // idに一致するセッションを検索
        const foundSession = data.find((s: any) => s.id.toString() === id);
        if (foundSession) {
          setSession({
            ...foundSession,
            id: foundSession.id.toString(),
            materials: foundSession.materials || []
          });
        } else {
          setSession(null);
        }
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