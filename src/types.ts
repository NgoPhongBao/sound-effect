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
  tukhoa?: string;
  theloai?: string;
  viral?: boolean;
  moi?: boolean;
}
