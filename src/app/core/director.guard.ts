import { CanActivateFn } from '@angular/router';

export const directorGuard: CanActivateFn = (route, state) => {
  return true;
};
