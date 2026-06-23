import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoginService } from '../services/login-service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  // Rutas públicas — no adjuntar token
  const rutasPublicas = ['/auth/login', '/auth/register'];
  const esPublica = rutasPublicas.some(ruta => req.url.includes(ruta));

  if (esPublica) return next(req);

  const token = loginService.recuperarToken();
  
  if (!token) return next(req);

  const cloneReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + token
    }
  });

  return next(cloneReq)//.pipe(
    //catchError((error: HttpErrorResponse) => {
    //  if (error.status === 401) {
       // loginService.cerrarSesion();
        //router.navigate(['/auth/login']);
      //}
      //return throwError(() => error);
    //})
  //);
};
    
