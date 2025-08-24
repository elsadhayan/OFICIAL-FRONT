// src/app/guards/unsaved-changes.guard.ts
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export interface CanExit {
  // flags/campos opcionales que el componente puede exponer
  saltarseGuard?: boolean;                 // ponlo en true tras un submit exitoso
  inscripcionForm?: { dirty: boolean };   // tu FormGroup
  canExit?: () => boolean;                // hook opcional del componente
}

@Injectable({ providedIn: 'root' })
export class UnsavedChangesGuard implements CanDeactivate<CanExit> {

  canDeactivate(
    component: CanExit,
    _currentRoute: ActivatedRouteSnapshot,
    _currentState: RouterStateSnapshot,
    _nextState?: RouterStateSnapshot
  ): boolean {

    // 1) Si ya enviaste (submit OK), deja salir sin preguntar
    if (component?.saltarseGuard) return true;

    // 2) Si el componente define su propio canExit(), úsalo
    if (typeof component?.canExit === 'function') {
      return component.canExit();
    }

    // 3) Si el form está sucio, pregunta; si no, deja salir
    if (component?.inscripcionForm?.dirty) {
      return window.confirm('Tienes cambios sin guardar, ¿salir de todos modos?');
    }

    return true;
  }
}
