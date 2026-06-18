import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../services/login-service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const loginService = inject(LoginService)

  const cloneReq = req.clone({
    setHeaders:{
      Authorization:'Bearer '+loginService.recuperarToken()
    }
  })

  return next(cloneReq);
};
    
