import { StudySession } from '@/types';
import categories from '@/data/categories/categories.json';
import sessionIndex from '@/data/sessions/index.json';

// Cache for loaded sessions
let sessionsCache: StudySession[] | null = null;

/**
 * Load all sessions from individual JSON files
 * Sessions are cached after first load for performance
 */
export async function loadAllSessions(): Promise<StudySession[]> {
  if (sessionsCache) {
    return sessionsCache;
  }

  const sessions: StudySession[] = [];
  
  // Load each session file listed in the index
  for (const filename of sessionIndex) {
    try {
      const sessionModule = await import(`@/data/sessions/${filename}`);
      sessions.push(sessionModule.default);
    } catch (error) {
      console.error(`Failed to load session ${filename}:`, error);
    }
  }

  // Sort by date (newest first) and cache
  sessionsCache = sessions.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return sessionsCache;
}

/**
 * Load a single session by ID
 */
export async function loadSessionById(id: string): Promise<StudySession | null> {
  const paddedId = id.padStart(3, '0');
  const filename = `session-${paddedId}.json`;
  
  try {
    const sessionModule = await import(`@/data/sessions/${filename}`);
    return sessionModule.default;
  } catch (error) {
    console.error(`Failed to load session ${id}:`, error);
    return null;
  }
}

/**
 * Get all categories
 */
export function getCategories() {
  return categories;
}

/**
 * Clear the sessions cache (useful for development)
 */
export function clearSessionsCache() {
  sessionsCache = null;
}

/**
 * Synchronous function to load sessions from JSON
 * This is used for immediate fallback when async loading fails
 */
export function loadSessionsFromJson(): StudySession[] {
  // For now, return the cached sessions if available
  if (sessionsCache) {
    return sessionsCache;
  }
  
  // Otherwise, we need to load them synchronously
  // This is a fallback, so we'll return an empty array if nothing is cached
  console.warn('No sessions cached, returning empty array');
  return [];
}