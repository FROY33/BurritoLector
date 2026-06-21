import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookInterface } from '../models/book-interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  URL = 'https://api-burritolector.onrender.com/books';
  constructor(private http: HttpClient) {}

  listar(): Observable<BookInterface[]> {
    return this.http.get<BookInterface[]>(this.URL);
  }
}