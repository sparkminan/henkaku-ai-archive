import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { StudySession } from '@/types';
import { getDataProvider } from '@/lib/data-provider';
import { subscribeToSessionChanges } from '@/lib/airtable';

interface DataContextType {
  sessions: StudySession[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastUpdated: Date | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const provider = getDataProvider();
      const data = await provider.fetchAllSessions();
      
      setSessions(data);
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(errorMessage);
      console.error('Error fetching sessions:', err);
      
      // Try to load fallback data
      try {
        const { loadAllSessions } = await import('@/utils/dataLoader');
        const fallbackData = await loadAllSessions();
        setSessions(fallbackData);
      } catch (fallbackErr) {
        console.error('Failed to load fallback data:', fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Subscribe to changes if using Airtable
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_AIRTABLE === 'true') {
      const unsubscribe = subscribeToSessionChanges((newSessions) => {
        setSessions(newSessions);
        setLastUpdated(new Date());
      });

      return unsubscribe;
    }
  }, []);

  // Auto-refresh every 5 minutes in production
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const interval = setInterval(() => {
        fetchData();
      }, 5 * 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [fetchData]);

  const value: DataContextType = {
    sessions,
    loading,
    error,
    refetch: fetchData,
    lastUpdated,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

// Specialized hooks
export function useSession(id: string) {
  const { sessions, loading, error } = useData();
  const session = sessions.find(s => s.id === id);
  
  return { session, loading, error };
}

export function useSessionsByTag(tag: string) {
  const { sessions, loading, error } = useData();
  const filteredSessions = sessions.filter(s => s.tags.includes(tag));
  
  return { sessions: filteredSessions, loading, error };
}

export function useRecentSessions(limit: number = 10) {
  const { sessions, loading, error } = useData();
  const recentSessions = [...sessions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
  
  return { sessions: recentSessions, loading, error };
}