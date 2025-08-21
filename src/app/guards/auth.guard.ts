import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const url = state.url || '';
  const esMisPagos = url.startsWith('/mis-pagos') || url.includes('/mis-pagos');

  // Si NO hay token y quiere entrar a MIS PAGOS
  if (!token && esMisPagos) {
    alert('🔒 Debes iniciar sesión para ver tus pagos.');
    // guardamos a dónde quería ir para regresar después del login
    router.navigate(['/login'], { queryParams: { redirectTo: url } });
    return false;
  }

  // Lógica general del guard (para cualquier ruta protegida que use este guard)
  if (!token) {
    alert('🔒 Debes iniciar sesión para acceder a este apartado.');
    router.navigate(['/home']);
    return false;
  }

  // Si hay token, permitir
  return true;
};
