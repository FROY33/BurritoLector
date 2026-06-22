// interfaces/rating.interface.ts
export interface Rating {
  id: number;
  score: number;
  bookId: number;
  userId: number;
  book: {
    id: number;
    title: string;
  };
  user: {
    id: number;
    name: string;
  };
}

export interface AfinidadFila {
  titulo: string;
  bookId: number;
  lector: string;
  suRating: number;
  miRating: number;
}

export interface ApiWrapper<T> {
  success: boolean;
  data: T;
  statusCode: number;
}

export interface RatingCrudo {
  id: number;
  userId: number;
  bookId: number;
  score: number;
}