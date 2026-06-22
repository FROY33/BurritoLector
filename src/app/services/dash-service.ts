import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashService {
  urlBase = 'https://api-burritolector.onrender.com/';

  constructor(private httpClient: HttpClient) {

  }

  obtenerNumeroLibros() {
    return this.httpClient.get<any>(this.urlBase + 'books/contar');
  }

  obtenerNumeroLectores() { 
    return this.httpClient.get<any>(this.urlBase + 'users/count-lectores');
  }

  obtenerPromedioRating() { 
    return this.httpClient.get<any>(this.urlBase + 'ratings/promedio');
  }
}
