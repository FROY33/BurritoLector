// services/rating.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, forkJoin } from 'rxjs';
import { Rating, RatingCrudo, AfinidadFila } from '../models/afinidad-model';
import { environment } from '../../environments/environment';


interface ApiWrapper<T> {
  success: boolean;
  data: T;
  statusCode: number;
}
interface SimilarBookDto {
  bookId:          number;
  title:           string;
  lector:          string;
  userScore:       number;
  otherUserScore:  number;
  scoreDifference: number;
}

  @Injectable({ providedIn: 'root' })
export class AfinidadService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/users`;

  getAffinityTable() {
    return this.http
      .get<ApiWrapper<SimilarBookDto[]>>(`${this.base}/afinidad`)
      .pipe(
        map(res => res.data.map(item => ({
          bookId:   item.bookId,
          titulo:   item.title,           // title  → titulo
          lector:   item.lector,
          suRating: item.otherUserScore,  // otherUserScore → suRating
          miRating: item.userScore,       // userScore      → miRating
        } as AfinidadFila)))
      );
  }
}

