import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { RegisterInterface } from '../models/register-interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  URL = 'https://api-burritolector.onrender.com/';


  constructor(private httpClient:HttpClient){

  }

  registrarse(usuario:RegisterInterface):Observable<any>{
      return this.httpClient.post(
        this.URL+'auth/register', usuario)
        .pipe(timeout(10000));
  }
}
