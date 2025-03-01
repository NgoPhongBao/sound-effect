export interface Sound {
  id: number;
  title: string;
  duration: number;
  plays: number;
  downloads: number;
  category: number;
  url: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  is_viral: boolean;
  is_trending: boolean;
  is_new: boolean;
}

export interface SoundUpdatePayload extends Partial<Sound> {}
export interface Category {
  id: number;
  name: string;
  priority: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryUpdatePayload extends Partial<Category> {}

export interface User {
  id: string;
  email?: string;
}

export interface SearchQuery {
  tukhoa?: string;
  theloai?: string;
  viral?: boolean;
  moi?: boolean;
}
