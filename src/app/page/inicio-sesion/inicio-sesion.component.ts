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
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule
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
    // 👇 ESTO es lo que te faltaba para ver el ID y usuario en consola
  const usuario = JSON.parse(localStorage.getItem('usuario')!);
  const id = localStorage.getItem('usuario_id');
  console.log('📌 Usuario logeado:', usuario);
  console.log('📌 ID del usuario:', id);
  }

 onLogin() {
  const { curp, contrasena } = this.loginForm.value;

  this.authService.login({ curp, contrasena }).subscribe({
    next: (res) => {
      const role = res.role?.trim().toLowerCase();

      // ✅ Guardar token para enviar con inscripciones
      localStorage.setItem('token', res.access_token); // 👈 importante
      console.log('Respuesta completa:', res);


      // ✅ También guarda los datos del usuario
      localStorage.setItem('usuario', JSON.stringify(res));
      localStorage.setItem('usuario_id', res.id); // 👈 útil si lo necesitas después

      // 🔁 Redireccionar según el rol
      switch (role) {
        case 'administrador':
          this.router.navigate(['/admin']);
          break;
        case 'director':
          this.router.navigate(['/director']);
          break;
        case 'maestro':
          this.router.navigate(['/instructor']);
          break;
        case 'usuario':
          this.router.navigate(['/home']);
          break;
        default:
          alert('Rol no reconocido');
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
      next: res => alert('✔ Laravel dice: ' + res.message),
      error: err => alert('❌ Laravel no responde')
    });
  }
}
