export interface Libro {
  id: number;
  title: string;
  author?: string;
  editor?: string;
  synopsis?: string;
  adminScore?: number;
  coverImageUrl?: string;
  communityScore?: number;
  genres?: { id: number; name: string }[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  lastPage: number;
}


  

  

  

  