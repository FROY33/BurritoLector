import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Libro } from '../models/libro-model';

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}

@Injectable({
  providedIn: 'root',
})
export class LibrosService {
  private http = inject(HttpClient);

  findAll(params: { page?: number; limit?: number; search?: string; genre?: number }): Observable<PaginatedResponse<Libro>> {
    let httpParams = new HttpParams();
    if (params.page)   httpParams = httpParams.set('page', params.page);
    if (params.limit)  httpParams = httpParams.set('limit', params.limit);
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.genre)  httpParams = httpParams.set('genre', params.genre);

    return this.http.get<PaginatedResponse<Libro>>(`${environment.apiUrl}/libros`, { params: httpParams });
  }
}
