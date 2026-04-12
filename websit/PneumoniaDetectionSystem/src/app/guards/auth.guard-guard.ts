import { inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth)
  const router = inject(Router)
  if (auth.isLoggedIn() && auth.isPatient()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
