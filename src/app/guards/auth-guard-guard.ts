import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from 'src/app/services/login-service';
import { Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService)
  const router = inject(Router)

  if (loginService.sesionIniciada()) {
    
    return true
  }
  else {
    
    router.navigateByUrl('/login')
    return false;
  }
  return true;
};
