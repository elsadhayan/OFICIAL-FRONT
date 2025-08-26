// src/app/auth/inicio-sesion/inicio-sesion.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

interface LoginResponse {
  role?: string;
  id?: string | number;
  token?: string;
  access_token?: string;
  usuario?: { role?: string; id?: string | number };
  user?: { role?: string; id?: string | number };
  [key: string]: any;
}

@Component({
  standalone: true,
  selector: 'app-inicio-sesion',
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatIconModule,
    MatButtonModule, MatSelectModule
  ],
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'] // ✅ plural y arreglo
})
export class InicioSesionComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      curp: ['', [Validators.required]],
      contrasena: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.authService.pingLaravel().subscribe({
      next: (res) => console.log('✔ Conectado con Laravel:', res),
      error: (err) => console.error('❌ No se pudo conectar con Laravel:', err)
    });

    try {
      const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
      const id = localStorage.getItem('usuario_id');
      console.log('📌 Usuario logeado:', usuario);
      console.log('📌 ID del usuario:', id);
    } catch {
      console.warn('No se pudo leer "usuario" de localStorage.');
    }
  }

  private extraerRole(res: LoginResponse): string {
    return (
      res.role ??
      res.usuario?.role ??
      res.user?.role ??
      ''
    ).toString().trim().toLowerCase();
  }

  private extraerId(res: LoginResponse): string {
    const id = (res.id ?? res.usuario?.id ?? res.user?.id ?? '').toString().trim();
    return id;
  }

  private extraerToken(res: LoginResponse): string {
    return (res.access_token ?? res.token ?? '').toString().trim();
  }

  onLogin(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    const { curp, contrasena } = this.loginForm.value;

    this.authService.login({
      curp: String(curp || '').toUpperCase(),
      contrasena
    }).subscribe({
      next: (res: LoginResponse) => {
        alert('✅ Inicio de sesión correctamente');

        const role  = this.extraerRole(res);
        const id    = this.extraerId(res);
        const token = this.extraerToken(res);

        if (token) localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(res));
        if (id) localStorage.setItem('usuario_id', id);

        // Redirección por rol
        switch (role) {
          case 'administrador':
            this.router.navigate(['/admin/gestionar-talleres']);
            break;
          case 'director':
            this.router.navigate(['/director/gestion']);
            break;
          case 'maestro':
          case 'instructor':
            this.router.navigate(['/instructor']);
            break;
          default:
            this.router.navigate(['/home']);
            break;
        }
      },
      error: (err) => {
        console.error('❌ Error en login:', err);
        alert('Credenciales inválidas');
      }
    });
  }

  probarConexion(): void {
    this.authService.pingLaravel().subscribe({
      next: (res: any) => alert('✔ Laravel dice: ' + (res?.message ?? 'ok')),
      error: () => alert('❌ Laravel no responde')
    });
  }
}
