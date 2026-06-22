import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Libro } from '../models/libro-model';

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}

interface ApiWrapper<T> {
  success: boolean;
  data: T;
  statusCode?: number;
}

@Injectable({
  providedIn: 'root',
})
export class LibrosService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api-burritolector.onrender.com/';

  findAll(params: { page?: number; limit?: number; search?: string; genre?: number }): Observable<PaginatedResponse<Libro>> {
    let httpParams = new HttpParams();
    if (params.page)   httpParams = httpParams.set('page', params.page);
    if (params.limit)  httpParams = httpParams.set('limit', params.limit);
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.genre)  httpParams = httpParams.set('genre', params.genre);

    return this.http
    .get<ApiWrapper<PaginatedResponse<Libro>>>(`${environment.apiUrl}/books`, { params: httpParams })
      .pipe(map(res => res.data));
    
  }
}
