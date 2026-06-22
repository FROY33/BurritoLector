import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginInterface } from '../models/login-interface';


// export interface LoginResponse {
//   access_token: string;
//   user: {
//     id: string;
//     email: string;
//     role: 'admin' | 'user';
//   };
// }

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
  };
  statusCode: number;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) { }
  URL = 'https://api-burritolector.onrender.com/auth/login';

private decodeToken(token: string): any {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

login(credentials: LoginInterface): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(this.URL, credentials).pipe(
    tap(response => {
      // El backend devuelve { token }, no { access_token }
      const token = response.data.token;
      const decoded = this.decodeToken(token);
      const role = decoded?.role ?? 'user';
      console.log(response)

      this.guardarToken(token, role);
    })
  );
}

/////////////////////////////
  // login(credentials: LoginInterface): Observable<LoginResponse> {
  //   return this.http
  //     .post<LoginResponse>(this.URL, credentials)
  //     .pipe(
  //       tap(response => {
  //         this.guardarToken(
  //           response.access_token,
  //           response.user.role
  //         );
  //       })
  //     );
  // }

  guardarToken(token: string, role: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  }

  cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  recuperarToken(): string | null {
    return localStorage.getItem("token");
  }

  recuperarRol(): string | null {
    return localStorage.getItem('role');
  }

  esAdmin(): boolean {
    return this.recuperarRol() === 'admin';
  }

  esUsuario(): boolean {
    return this.recuperarRol() === 'user';
  }


  sesionIniciada(): boolean {
    if (this.recuperarToken() == null)
      return false
    else
      return true
  }
}
