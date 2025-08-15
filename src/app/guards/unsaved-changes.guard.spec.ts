// src/app/guards/unsaved-changes.guard.ts
import { CanDeactivateFn } from '@angular/router';

export interface CanExit {
  canDeactivate: () => boolean;   // El componente decide si se puede salir
}

export const unsavedChangesGuard: CanDeactivateFn<CanExit> = (component) => {
  return component?.canDeactivate ? component.canDeactivate() : true;
};
