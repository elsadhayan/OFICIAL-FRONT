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

@Component({
  standalone: true,
  selector: 'app-inicio-sesion',
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatIconModule,
    MatButtonModule, MatSelectModule
  ],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      curp: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.pingLaravel().subscribe({
      next: (res) => console.log('✔ Conectado con Laravel:', res),
      error: (err) => console.error('❌ No se pudo conectar con Laravel:', err)
    });

    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
    const id = localStorage.getItem('usuario_id');
    console.log('📌 Usuario logeado:', usuario);
    console.log('📌 ID del usuario:', id);
  }

  onLogin(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    const { curp, contrasena } = this.loginForm.value;

    this.authService.login({
      curp: String(curp).toUpperCase(),
      contrasena
    }).subscribe({
      next: (res) => {

        alert(' ✅Inicio de sesion correctamente ');
        // Normaliza posibles formas de respuesta del backend
        const role = (res.role ?? res.usuario?.role ?? res.user?.role ?? '')
          .toString().trim().toLowerCase();
        const id   = (res.id ?? res.usuario?.id ?? res.user?.id ?? '').toString();
        const token = (res.access_token ?? res.token ?? '');

        // Guarda lo mínimo
        if (token) localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(res));
        if (id) localStorage.setItem('usuario_id', id);

        // Redirección por rol (solo te afecta login)
        switch (role) {
          case 'administrador':
            this.router.navigate(['/admin/gestionar-talleres']); // <- página de Juan
            break;
          case 'director':
            this.router.navigate(['/director/gestion']);
            break;
          case 'maestro':
          case 'instructor':
            this.router.navigate(['/instructor']);
            break;
          default: // usuario u otro
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

  probarConexion() {
    this.authService.pingLaravel().subscribe({
      next: (res: any) => alert('✔ Laravel dice: ' + (res.message ?? 'ok')),
      error: () => alert('❌ Laravel no responde')
    });
  }
}
