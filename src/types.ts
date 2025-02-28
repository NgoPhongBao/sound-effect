export interface Sound {
  id: number;
  title: string;
  duration: string;
  plays: number;
  downloads: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface User {
  id: string;
  email?: string;
}

export interface SearchQuery {
  q?: string;
  category?: string;
  isViral?: boolean;
  isNew?: boolean;
}
