// Airtable specific types
export interface AirtableSession {
  id: string;
  fields: {
    ID: number;
    Title: string;
    Date: string;
    Presenter: string;
    Description: string;
    Tags: string[];
    ThumbnailUrl?: string;
    PodcastUrl?: string;
    VideoUrl?: string;
    Status: 'Published' | 'Draft' | 'Archived';
    Materials?: string[];
    SlidesUrl?: string;
    RecordingUrl?: string;
    CreatedAt?: string;
    UpdatedAt?: string;
  };
}

// Configuration for field mapping
export interface FieldMapping {
  airtableField: string;
  localField: string;
  transform?: (value: any) => any;
}

// Airtable configuration
export interface AirtableConfig {
  apiKey: string;
  baseId: string;
  tableName: string;
  view?: string;
  sort?: Array<{ field: string; direction: 'asc' | 'desc' }>;
  filterByFormula?: string;
  maxRecords?: number;
  pageSize?: number;
}

// Response types
export interface AirtableResponse<T> {
  records: T[];
  offset?: string;
}

export interface AirtableError {
  error: {
    type: string;
    message: string;
  };
  statusCode: number;
}