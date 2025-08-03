import { AirtableSession, AirtableConfig, AirtableResponse, FieldMapping } from '@/types/airtable';
import { StudySession } from '@/types';

// Field mapping configuration
export const sessionFieldMapping: FieldMapping[] = [
  { airtableField: 'ID', localField: 'id', transform: (v) => String(v) },
  { airtableField: 'Title', localField: 'title' },
  { airtableField: 'Date', localField: 'date' },
  { airtableField: 'Presenter', localField: 'presenter' },
  { airtableField: 'Description', localField: 'description' },
  { airtableField: 'Tags', localField: 'tags', transform: (v) => v ? String(v).split(';').map(tag => tag.trim()) : [] },
  { airtableField: 'ThumbnailURL', localField: 'thumbnailUrl' },
  { airtableField: 'PodcastURL', localField: 'podcastUrl' },
  { airtableField: 'VideoURL', localField: 'videoUrl' },
  { airtableField: 'Status', localField: 'status' },
  { airtableField: 'Materials', localField: 'materials', transform: (v) => v ? String(v).split(',').map(m => m.trim()) : [] },
  { airtableField: 'SlidesURL', localField: 'slidesUrl' },
  { airtableField: 'RecordingURL', localField: 'recordingUrl' },
];

export class AirtableClient {
  private config: AirtableConfig;
  private baseUrl: string;

  constructor(config: Partial<AirtableConfig>) {
    this.config = {
      apiKey: config.apiKey || process.env.AIRTABLE_API_KEY || '',
      baseId: config.baseId || process.env.AIRTABLE_BASE_ID || '',
      tableName: config.tableName || process.env.AIRTABLE_SESSIONS_TABLE_NAME || 'Sessions',
      view: config.view,
      sort: config.sort || [{ field: 'ID', direction: 'desc' }],
      filterByFormula: config.filterByFormula || "Status='Published'",
      maxRecords: config.maxRecords,
      pageSize: config.pageSize || 100,
    };

    this.baseUrl = `https://api.airtable.com/v0/${this.config.baseId}/${this.config.tableName}`;
  }

  private getHeaders(): HeadersInit {
    return {
      'Authorization': `Bearer ${this.config.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  private buildQueryParams(): string {
    const params = new URLSearchParams();
    
    if (this.config.view) {
      params.append('view', this.config.view);
    }
    
    if (this.config.sort) {
      this.config.sort.forEach((sort, index) => {
        params.append(`sort[${index}][field]`, sort.field);
        params.append(`sort[${index}][direction]`, sort.direction);
      });
    }
    
    if (this.config.filterByFormula) {
      params.append('filterByFormula', this.config.filterByFormula);
    }
    
    if (this.config.maxRecords) {
      params.append('maxRecords', String(this.config.maxRecords));
    }
    
    if (this.config.pageSize) {
      params.append('pageSize', String(this.config.pageSize));
    }
    
    return params.toString();
  }

  private transformRecord(record: AirtableSession): StudySession {
    const transformed: any = {};
    
    sessionFieldMapping.forEach(mapping => {
      const value = record.fields[mapping.airtableField as keyof AirtableSession['fields']];
      if (value !== undefined) {
        transformed[mapping.localField] = mapping.transform ? mapping.transform(value) : value;
      }
    });

    // Handle thumbnail URL for local development
    if (transformed.thumbnailUrl && !transformed.thumbnailUrl.startsWith('http')) {
      transformed.thumbnailUrl = transformed.thumbnailUrl;
    }

    return transformed as StudySession;
  }

  async fetchAll(): Promise<StudySession[]> {
    const allRecords: StudySession[] = [];
    let offset: string | undefined;

    try {
      do {
        const queryParams = this.buildQueryParams();
        const url = `${this.baseUrl}?${queryParams}${offset ? `&offset=${offset}` : ''}`;
        
        const response = await fetch(url, {
          headers: this.getHeaders(),
        });

        if (!response.ok) {
          throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
        }

        const data: AirtableResponse<AirtableSession> = await response.json();
        
        const transformedRecords = data.records.map(record => this.transformRecord(record));
        allRecords.push(...transformedRecords);
        
        offset = data.offset;
      } while (offset);

      return allRecords;
    } catch (error) {
      console.error('Error fetching from Airtable:', error);
      throw error;
    }
  }

  async fetchById(id: string): Promise<StudySession | null> {
    try {
      const filterFormula = `ID='${id}'`;
      const queryParams = new URLSearchParams({
        filterByFormula: filterFormula,
        maxRecords: '1',
      });
      
      const url = `${this.baseUrl}?${queryParams}`;
      const response = await fetch(url, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
      }

      const data: AirtableResponse<AirtableSession> = await response.json();
      
      if (data.records.length === 0) {
        return null;
      }

      return this.transformRecord(data.records[0]);
    } catch (error) {
      console.error('Error fetching record from Airtable:', error);
      throw error;
    }
  }

  async fetchRecent(limit: number = 10): Promise<StudySession[]> {
    const client = new AirtableClient({
      ...this.config,
      maxRecords: limit,
      sort: [{ field: 'Date', direction: 'desc' }],
    });
    
    return client.fetchAll();
  }

  async fetchByTags(tags: string[]): Promise<StudySession[]> {
    const tagFilters = tags.map(tag => `FIND('${tag}', {Tags})`).join(', ');
    const filterFormula = `AND(Status='Published', OR(${tagFilters}))`;
    
    const client = new AirtableClient({
      ...this.config,
      filterByFormula: filterFormula,
    });
    
    return client.fetchAll();
  }

  async fetchByDateRange(startDate: Date, endDate: Date): Promise<StudySession[]> {
    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];
    const filterFormula = `AND(Status='Published', Date>='${start}', Date<='${end}')`;
    
    const client = new AirtableClient({
      ...this.config,
      filterByFormula: filterFormula,
    });
    
    return client.fetchAll();
  }

  // Watch for changes (webhook endpoint needed)
  subscribeToChanges(callback: (sessions: StudySession[]) => void): () => void {
    // This would be implemented with Airtable webhooks
    // For now, we'll use polling as a fallback
    const pollInterval = 60000; // 1 minute
    
    const interval = setInterval(async () => {
      try {
        const sessions = await this.fetchAll();
        callback(sessions);
      } catch (error) {
        console.error('Error polling Airtable:', error);
      }
    }, pollInterval);

    // Return cleanup function
    return () => clearInterval(interval);
  }
}