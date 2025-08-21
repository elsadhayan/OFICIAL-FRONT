import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const usuario = localStorage.getItem('usuario');

  if (!usuario) return false;

  const role = JSON.parse(usuario).role?.trim().toLowerCase();
  return role === 'administrador';

};
