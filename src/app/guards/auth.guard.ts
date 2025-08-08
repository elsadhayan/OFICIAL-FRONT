import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  if (token) {
    return true;
  } else {
    alert('🔒 Debes iniciar sesión para acceder a este apartado.');
    router.navigate(['/home']);
    return false;
  }
};
