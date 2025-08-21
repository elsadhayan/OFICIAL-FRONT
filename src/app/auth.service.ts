// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // <— agregado HttpHeaders
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Tu backend corre en 8000
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  // --- Salud / ping ---
  pingLaravel(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ping`);
  }

  // --- Registro (ajusta a /register si tu backend usa ese endpoint) ---
  register(role: string, curp: string, contrasena: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/registro`, {
      role,
      curp: curp.toUpperCase(),
      contrasena
    });
  }

  // --- Login (devuelve observable por si lo quieres usar directo) ---
  login(data: { curp: string; contrasena: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {
      curp: data.curp.toUpperCase(),
      contrasena: data.contrasena
    });
  }

  // --- Login + redirección por rol ---
  loginYRedireccionar(data: { curp: string; contrasena: string }): void {
    this.login(data).subscribe({
      next: (res: any) => {
        const role = (res.role ?? res.usuario?.role ?? res.user?.role ?? '')
          .toString()
          .trim()
          .toLowerCase();
        const id = (res.id ?? res.usuario?.id ?? res.user?.id ?? '').toString();
        const token = (res.access_token ?? res.token ?? '').toString();

        if (token) localStorage.setItem('token', token); // <— aquí guardas el token
        localStorage.setItem('usuario', JSON.stringify(res));
        if (id) localStorage.setItem('usuario_id', id);

        switch (role) {
          case 'administrador':
            this.router.navigate(['/admin']);
            break;
          case 'director':
            this.router.navigate(['/director/gestion']);
            break;
          case 'maestro':
          case 'instructor':
            this.router.navigate(['/instructor']);
            break;
          case 'usuario':
          default:
            this.router.navigate(['/home']);
            break;
        }
      },
      error: (err) => {
        console.error(err);
        alert('Credenciales inválidas');
      }
    });
  }

  // --- NUEVO: Cambiar contraseña (usa el token guardado como "token") ---
  changePassword(payload: {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
  }): Observable<{ message: string }> {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.put<{ message: string }>(`${this.baseUrl}/password`, payload, { headers });
  }

  // --- Helpers de sesión ---
  setUser(user: any): void {
    localStorage.setItem('usuario', JSON.stringify(user));
  }

  getUser(): any | null {
    const raw = localStorage.getItem('usuario') || localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }

  getUserRole(): string | null {
    const u = this.getUser();
    return (u?.role ?? u?.usuario?.role ?? u?.user?.role ?? null)?.toString() ?? null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuario_id');
    // this.router.navigate(['/login']); // opcional
  }
  resetPasswordByCurp(payload: {
  curp: string;
  new_password: string;
  new_password_confirmation: string;
}) {
  return this.http.post<{ message: string }>(
    `${this.baseUrl}/password/reset-curp`,
    {
      curp: payload.curp.toUpperCase(),
      new_password: payload.new_password,
      new_password_confirmation: payload.new_password_confirmation
    }
  );
}

}
