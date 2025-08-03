import { StudySession } from '@/types';
import { cache, CACHE_KEYS } from './cache';

interface AirtableRecord {
  id: string;
  fields: {
    ID: number;
    Title: string;
    Date: string;
    Presenter: string;
    Description: string;
    Tags?: string;
    ThumbnailURL?: string;
    PodcastURL?: string;
    VideoURL?: string;
    Status: string;
    Materials?: string;
  };
}

interface AirtableResponse {
  records: AirtableRecord[];
}

// 🎆 GAS API経由のリアルタイムAirtableデータ取得
export async function fetchSessionsFromAirtable(): Promise<StudySession[]> {
  // キャッシュチェック
  const cachedSessions = cache.get<StudySession[]>(CACHE_KEYS.SESSIONS);
  if (cachedSessions) {
    console.log('📦 Returning cached sessions data');
    return cachedSessions;
  }

  const gasApiUrl = process.env.NEXT_PUBLIC_GAS_API_URL;
  
  // GAS APIが設定されている場合はリアルタイム取得を試行
  if (gasApiUrl) {
    try {
      console.log('🚀 Fetching live data from GAS API...');
      
      const response = await fetch(gasApiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(`GAS API Error: ${result.error}`);
      }
      
      const sessions = result.data;
      
      // キャッシュに保存（3分間）
      cache.set(CACHE_KEYS.SESSIONS, sessions, 3);
      
      console.log(`✨ Successfully loaded ${sessions.length} sessions from GAS API`);
      console.log('🕰️ Data timestamp:', result.timestamp);
      return sessions;
      
    } catch (error) {
      console.warn('⚠️ GAS API fetch failed:', error);
      console.log('📂 Falling back to static data');
    }
  } else {
    console.log('🔧 GAS API URL not configured, using static data');
  }
  
  // フォールバック: 静的ファイルを使用
  return fetchStaticSessions();
}

// 静的JSONファイルからデータを取得（フォールバック）
async function fetchStaticSessions(): Promise<StudySession[]> {
  try {
    const basePath = process.env.NODE_ENV === 'production' ? '/henkaku-ai-archive' : '';
    const response = await fetch(`${basePath}/data/airtable-sessions.json`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch static sessions');
    }
    
    const data = await response.json();
    return data.map((session: any) => ({
      ...session,
      id: session.id.toString(),
      materials: session.materials || []
    }));
  } catch (error) {
    console.error('Error fetching static sessions:', error);
    return [];
  }
}

// 単一セッションを取得
export async function fetchSessionFromAirtable(id: string): Promise<StudySession | null> {
  const sessions = await fetchSessionsFromAirtable();
  return sessions.find(session => session.id === id) || null;
}