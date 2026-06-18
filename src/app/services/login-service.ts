import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginInterface } from '../models/login-interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  login(credentials: LoginInterface): Observable<any> {
    return of({
      access_token: '',
      user: {
        role: ''
      }
    });
  }

  guardarToken(token: string, role:string) {
    localStorage.setItem("token", token);
    localStorage.setItem("role",role);
  }

  cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

  }

  recuperarToken():string | null {
    return localStorage.getItem("token");
  }

  sesionIniciada():boolean {
    if (this.recuperarToken()==null)
      return false
    else
      return true
  }
}
