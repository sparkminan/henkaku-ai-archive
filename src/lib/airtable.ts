import Airtable from 'airtable';

// Airtable configuration
if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
  console.warn('Airtable configuration is missing. Please check your .env.local file.');
}

// Initialize Airtable
const base = process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID
  ? new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
  : null;

// Type definitions
export interface AirtableSession {
  id: string;
  fields: {
    ID: string;
    Title: string;
    Date: string;
    Presenter: string;
    Description: string;
    Tags: string;
    ThumbnailURL: string;
    PodcastURL?: string;
    VideoURL?: string;
    Status: string;
    Materials?: string;
  };
}

// Convert Airtable record to our Session type
export function airtableToSession(record: AirtableSession) {
  const fields = record.fields;
  return {
    id: fields.ID,
    title: fields.Title,
    date: fields.Date,
    presenter: fields.Presenter,
    description: fields.Description,
    tags: fields.Tags ? fields.Tags.split(';').map(tag => tag.trim()) : [],
    thumbnailUrl: fields.ThumbnailURL,
    podcastUrl: fields.PodcastURL || undefined,
    videoUrl: fields.VideoURL || undefined,
    status: fields.Status,
    materials: fields.Materials ? fields.Materials.split(',').map(m => m.trim()) : []
  };
}

// Fetch all sessions from Airtable
export async function fetchSessions() {
  if (!base) {
    console.warn('Airtable is not configured, using fallback data');
    return null;
  }

  try {
    const records = await base(process.env.AIRTABLE_SESSIONS_TABLE_NAME || 'Sessions')
      .select({
        view: 'Grid view',
        sort: [{ field: 'ID', direction: 'desc' }]
      })
      .all();

    return records.map(record => airtableToSession(record as unknown as AirtableSession));
  } catch (error) {
    console.error('Error fetching sessions from Airtable:', error);
    return null;
  }
}

// Fetch a single session by ID
export async function fetchSessionById(sessionId: string) {
  if (!base) {
    console.warn('Airtable is not configured, using fallback data');
    return null;
  }

  try {
    const records = await base(process.env.AIRTABLE_SESSIONS_TABLE_NAME || 'Sessions')
      .select({
        filterByFormula: `{ID} = '${sessionId}'`,
        maxRecords: 1
      })
      .firstPage();

    if (records.length > 0) {
      return airtableToSession(records[0] as unknown as AirtableSession);
    }
    return null;
  } catch (error) {
    console.error('Error fetching session from Airtable:', error);
    return null;
  }
}