import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  standalone:true,
  selector: 'app-crearcuenta',
  imports:[CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule, MatOption,RouterLink,MatSelect],
  templateUrl: './crearcuenta.component.html',
  styleUrl: './crearcuenta.component.css'
})
export class CrearcuentaComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      curp: ['', Validators.required],
      contrasena: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
      role: ['', Validators.required] // nuevo campo
    });
  }

  onRegister() {
    const {role, curp, contrasena, confirmarContrasena } = this.registerForm.value;

    if (contrasena !== confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.http.post('http://127.0.0.1:8000/api/registro', {
      role,
      curp,
      contrasena,

    }).subscribe({
      next: () => {
        alert('Cuenta creada exitosamente');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear cuenta');
      }
    });
  }
}
