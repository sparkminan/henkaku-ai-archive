export interface StudySession {
  id: string;
  title: string;
  date: string;
  presenter: string;
  description: string;
  tags: string[];
  materials: Material[];
  videoUrl?: string;
  thumbnailUrl?: string;
}

export interface Material {
  id: string;
  title: string;
  type: 'slide' | 'document' | 'code' | 'other';
  url: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}
