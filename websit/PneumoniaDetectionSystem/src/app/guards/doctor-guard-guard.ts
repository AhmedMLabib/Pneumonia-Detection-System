import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const doctorGuardGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth)
  const router = inject(Router)
  if (auth.isLoggedIn() && auth.getUserType()?.toLowerCase() === 'doctor') {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
