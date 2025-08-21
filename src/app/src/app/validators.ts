// src/app/validators.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  // Validador simple de CURP - solo 18 caracteres
  static curpValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // No validar si está vacío (será manejado por required)
      }

      const curp = control.value.toString().trim();

      // Verificar que tenga exactamente 18 caracteres
      if (curp.length !== 18) {
        return { curpInvalid: { message: 'La CURP debe tener exactamente 18 caracteres' } };
      }

      return null; // CURP válida
    };
  }

  // Validador simple de contraseña - mínimo 6, máximo 50
  static passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // No validar si está vacío (será manejado por required)
      }

      const password = control.value.toString();
      const errors: any = {};

      // Mínimo 6 caracteres
      if (password.length < 6) {
        errors.minLength = 'Debe tener al menos 6 caracteres';
      }

      // Máximo 50 caracteres
      if (password.length > 50) {
        errors.maxLength = 'No debe exceder 50 caracteres';
      }

      return Object.keys(errors).length > 0 ? { passwordWeak: errors } : null;
    };
  }

  // Validador para confirmar contraseñas
  static passwordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) {
        return null;
      }

      if (matchingControl.errors && !matchingControl.errors['passwordMismatch']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordMismatch: 'Las contraseñas no coinciden' });
        return { passwordMismatch: true };
      } else {
        if (matchingControl.errors) {
          delete matchingControl.errors['passwordMismatch'];
          if (Object.keys(matchingControl.errors).length === 0) {
            matchingControl.setErrors(null);
          }
        }
        return null;
      }
    };
  }
}
