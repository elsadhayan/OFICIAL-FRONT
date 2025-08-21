import { CanMatchFn } from '@angular/router';

export const instructorGuard: CanMatchFn = (route, segments) => {
  return true;
};
