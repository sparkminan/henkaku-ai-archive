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

// Airtable APIからデータを直接取得する関数
export async function fetchSessionsFromAirtable(): Promise<StudySession[]> {
  // キャッシュチェック
  const cachedSessions = cache.get<StudySession[]>(CACHE_KEYS.SESSIONS);
  if (cachedSessions) {
    console.log('Returning cached sessions data');
    return cachedSessions;
  }

  const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
  const tableName = process.env.NEXT_PUBLIC_AIRTABLE_SESSIONS_TABLE_NAME || 'Sessions';
  
  // 本番環境では環境変数が設定されていない場合は静的ファイルにフォールバック
  if (!baseId || typeof window === 'undefined') {
    console.log('Airtable credentials not available, falling back to static data');
    return fetchStaticSessions();
  }

  try {
    // CORS対応のためのプロキシAPI経由でAirtableにアクセス
    const response = await fetch(`/api/airtable/sessions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn('Airtable API failed, falling back to static data');
      return fetchStaticSessions();
    }

    const data: AirtableResponse = await response.json();
    
    // Airtableのレスポンスをフォーマット
    const sessions = data.records.map((record) => ({
      id: record.fields.ID.toString(),
      title: record.fields.Title,
      date: record.fields.Date,
      presenter: record.fields.Presenter,
      description: record.fields.Description,
      tags: record.fields.Tags ? record.fields.Tags.split(';').map(tag => tag.trim()) : [],
      thumbnailUrl: record.fields.ThumbnailURL,
      podcastUrl: record.fields.PodcastURL,
      videoUrl: record.fields.VideoURL,
      status: record.fields.Status,
      materials: record.fields.Materials ? record.fields.Materials.split(',').map(m => m.trim()) : []
    }));

    // IDでソート（降順）
    const sortedSessions = sessions.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    
    // キャッシュに保存（5分間）
    cache.set(CACHE_KEYS.SESSIONS, sortedSessions, 5);
    
    return sortedSessions;
    
  } catch (error) {
    console.error('Error fetching from Airtable:', error);
    console.log('Falling back to static data');
    return fetchStaticSessions();
  }
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