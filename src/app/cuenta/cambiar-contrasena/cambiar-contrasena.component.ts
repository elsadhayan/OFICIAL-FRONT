import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-cambiar-contrasena',
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatSnackBarModule, RouterLink
  ],
  templateUrl: './cambiar-contrasena.component.html',
   styleUrls: ['./cambiar-contrasena.component.css']  // ← aquí

})

export class CambiarContrasenaComponent {
  hide2 = true; hide3 = true;
  loading = false;

  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private sb: MatSnackBar) {
    this.form = this.fb.group({
      curp: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      new_password_confirmation: ['', [Validators.required]],
    });
  }

  get passwordsDoNotMatch() {
    const v = this.form.value;
    return v.new_password !== v.new_password_confirmation &&
           this.form.get('new_password_confirmation')?.touched;
  }

  submit() {
    if (this.form.invalid || this.passwordsDoNotMatch) return;
    this.loading = true;

    this.auth.resetPasswordByCurp({
      curp: this.form.value.curp!,
      new_password: this.form.value.new_password!,
      new_password_confirmation: this.form.value.new_password_confirmation!
    }).subscribe({
      next: (res) => {
        this.loading = false;
        this.sb.open(res?.message || 'Contraseña restablecida', 'OK', { duration: 3000 });
        this.form.reset();
      },
      error: (err) => {
        this.loading = false;
        const msg = err?.error?.message || 'No se pudo restablecer la contraseña';
        this.sb.open(msg, 'OK', { duration: 4000 });
      }
    });
  }
}
