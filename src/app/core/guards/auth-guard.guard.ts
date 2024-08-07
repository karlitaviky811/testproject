import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth_service';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router);

  if(authService.isAuthenticated()){
    return true;
  }else{
    return router.navigate(['/sign-in']);
  }

  return true;
};
