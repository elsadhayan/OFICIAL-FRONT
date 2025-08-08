import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

export interface CanExit {
  canExit: () => boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard implements CanDeactivate<CanExit> {
  private hasLoggedOut = false; // 🔹 flag para evitar múltiples ejecuciones

  constructor(private authService: AuthService, private router: Router) {}

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Si ya cerró sesión, no volver a preguntar
    if (this.hasLoggedOut) {
      return true;
    }

    const confirmExit = window.confirm('¿Estás seguro que deseas salir de este apartado?');

    if (confirmExit) {
      // ✅ Evita que vuelva a ejecutarse
      this.hasLoggedOut = true;

      this.authService.logout();              // Cierra sesión
      this.router.navigate(['/']);            // Redirige al home
      alert('🔒 Tu sesión se ha cerrado correctamente.');
      return false; // Bloquea navegación original (ya redirigimos manualmente)
    }

    return false; // Usuario dijo que no quiere salir
  }
}
