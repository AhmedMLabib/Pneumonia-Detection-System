import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const DoctorGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth)
  const router = inject(Router)
  if (auth.isLoggedIn() && auth.getUserType()?.toLowerCase() === 'doctor') {
    return true;
  }
  router.navigate(['/login']);
  return false;
};