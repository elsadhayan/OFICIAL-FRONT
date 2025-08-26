import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InscripcionService } from '../services/inscripcion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CanExit } from '../guards/unsaved-changes.guard';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-inscripcion',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './inscripcion.component.html',
  styleUrl: './inscripcion.component.css'
})
export class InscripcionComponent implements OnInit, CanExit {
  formularioBloqueado: boolean = false; // ✅ nuevo
   // ⬇⬇⬇ NUEVO: flag para saltarse el guard tras un submit exitoso
  saltarseGuard = false;

  canExit(): boolean {
    return true;
  }

   // ---- NO borres el token aquí, solo pregunta:

  inscripcionForm: FormGroup;
  edad: number[] = Array.from({ length: 86 }, (_, i) => i + 5);
  tipo_sangre: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  alergia: string[] = ['Si', 'No'];
  tratamiento_medico: string[] = ['Si', 'No'];
  enfermedades: string[] = ['Si', 'No'];
  estudios: string[] = ['Si', 'No'];
  talleres = [
    { id: 1, nombre: 'Taller de Guitarra', edad_minima: 9, edad_maxima: null },
    { id: 2, nombre: 'Taller de dibujo infantil', edad_minima: 5, edad_maxima: 7 },
    { id: 3, nombre: 'Taller de musica y solfeo', edad_minima: 7, edad_maxima: null },
    { id: 4, nombre: 'Taller de fotografia', edad_minima: 10, edad_maxima: null },
    { id: 5, nombre: 'Taller de danza folclorica', edad_minima: 5, edad_maxima: null },
    { id: 6, nombre: 'Taller de ballet clasico', edad_minima: 5, edad_maxima: 18 },
    { id: 7, nombre: 'Taller de decoracion en ceramica', edad_minima: 7, edad_maxima: null },
    { id: 8, nombre: 'Taller de marimba', edad_minima: 10, edad_maxima: null },
    { id: 9, nombre: 'Taller de dibujo y pintura', edad_minima: 8, edad_maxima: null }
  ];
  escuelas: string[] = [
    'Primaria Vicente Guerrero',
    'Primaria Leonceo Gonzales',
    'Primaria La Luz',
    'Primaria Sor Juana',
    'Secundaria Tecnica 25',
    'Cecyte plantel 25',
    'Universidad UTVCO'
  ];
  estados: string[] = ['Activo', 'No activo'];

  tipoPago: string = 'inscripcion';
  edadMinima: number | null = null;
  edadMaxima: number | null = null;
  edadInvalida: boolean = false;

  constructor(
    private fb: FormBuilder,
    private inscripcionService: InscripcionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const usuarioId = usuario.id || null;

    this.inscripcionForm = this.fb.group({
      // Datos personales
      taller_id: ['', Validators.required],
      apellido_paterno: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ\\s]+$')]],
      apellido_materno: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ\\s]+$')]],
      nombres: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ\\s]+$')]],
      fecha_nacimiento: ['', [Validators.required]],
      edad: ['', Validators.required],
      sexo: ['', Validators.required],
      numero_telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      numero_casa: [''],
      taller_cultural: [''],
      usuario_id: [usuarioId],

      // Datos médicos
      alergia: ['', Validators.required],
      alergia_descripcion: [''],
      tipo_sangre: ['', Validators.required],
      tratamiento_medico: ['', Validators.required],
      tratamiento_descripcion: [''],
      enfermedad_cronica: ['', Validators.required],
      enfermedad_descripcion: [''],
      tutor_emergencia: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ\\s]+$')]],
      telefono_emergencia: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],

      // Datos académicos
      estudio_alumno: ['', Validators.required],
      grado_estudio: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9ÁÉÍÓÚáéíóúñÑ\\s]+$')]],
      institucion_educativa: [''],
      escuela_nueva: [''],
      estado: ['', Validators.required],

      // Tutor
      apellido_paterno_tutor: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ\\s]+$')]],
      apellido_materno_tutor: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ\\s]+$')]],
      nombres_tutor: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ\\s]+$')]],
      numero_telefonico: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      correo: [''],
      domicilio: ['', Validators.required],
    });
  }

  habilitarEdicion(): void {
    this.formularioBloqueado = false;
    this.inscripcionForm.enable();
  }

  ngOnInit(): void {
    const ruta = this.router.url;
    this.tipoPago = ruta.includes('reinscripciones') ? 'reinscripción' : 'inscripción';

    if (this.tipoPago === 'reinscripción' && !this.alumnoId) {
      this.obtenerDatosPrevios();
      this.formularioBloqueado = true;
      this.inscripcionForm.disable();
    }

    if (this.router.url.includes('reinscripcion')) {
      this.inscripcionService.obtenerDatosUsuario().subscribe({
        next: (data: any) => {
          this.inscripcionForm.patchValue(data);
          this.inscripcionForm.disable();
        },
        error: (err) => {
          console.warn('⚠️ No se encontraron datos previos para reinscripción:', err);
        }
      });
    }

    this.inscripcionForm.get('taller_id')?.valueChanges.subscribe(() => {
      this.validarEdadManual();
    });

    this.inscripcionForm.get('edad')?.valueChanges.subscribe(() => {
      this.validarEdadManual();
    });

    this.inscripcionForm.get('alergia')?.valueChanges.subscribe(valor => {
      const campo = this.inscripcionForm.get('alergia_descripcion');
      if (valor === 'Si') campo?.setValidators([Validators.required]);
      else {
        campo?.clearValidators();
        campo?.setValue('');
      }
      campo?.updateValueAndValidity();
    });

    this.inscripcionForm.get('tratamiento_medico')?.valueChanges.subscribe(valor => {
      const campo = this.inscripcionForm.get('tratamiento_descripcion');
      if (valor === 'Si') campo?.setValidators([Validators.required]);
      else {
        campo?.clearValidators();
        campo?.setValue('');
      }
      campo?.updateValueAndValidity();
    });

    this.inscripcionForm.get('enfermedad_cronica')?.valueChanges.subscribe(valor => {
      const campo = this.inscripcionForm.get('enfermedad_descripcion');
      if (valor === 'Si') campo?.setValidators([Validators.required]);
      else {
        campo?.clearValidators();
        campo?.setValue('');
      }
      campo?.updateValueAndValidity();
    });

   this.inscripcionForm.get('estudio_alumno')?.valueChanges.subscribe(valor => {
  const grado = this.inscripcionForm.get('grado_estudio');
  const institucion = this.inscripcionForm.get('institucion_educativa');
  const estado = this.inscripcionForm.get('estado');
  const otraEscuela = this.inscripcionForm.get('escuela_nueva');

  if (valor === 'Si') {
    // Requeridos: grado y estado
    grado?.setValidators([Validators.required, Validators.pattern('^[a-zA-Z0-9ÁÉÍÓÚáéíóúñÑ\\s]+$')]);
    estado?.setValidators([Validators.required]);

    // NO requerido: institución educativa
    institucion?.clearValidators();
  } else {
    // Nada requerido si no estudia actualmente
    grado?.clearValidators();
    estado?.clearValidators();
    institucion?.clearValidators();
    otraEscuela?.clearValidators();

    grado?.setValue('');
    estado?.setValue('');
    institucion?.setValue('');
    otraEscuela?.setValue('');
  }

  grado?.updateValueAndValidity();
  estado?.updateValueAndValidity();
  institucion?.updateValueAndValidity();
  otraEscuela?.updateValueAndValidity();
});

  }

  obtenerDatosPrevios() {
    this.inscripcionService.obtenerDatosUsuario().subscribe({
      next: (data: any) => {
        this.inscripcionForm.patchValue(data);
        this.inscripcionForm.disable();
      },
      error: (err) => {
        console.warn('⚠️ No se encontraron datos previos para reinscripción:', err);
      }
    });
  }

  validarEdadManual() {
    const edad = this.inscripcionForm.get('edad')?.value;
    const tallerId = this.inscripcionForm.get('taller_id')?.value;
    const taller = this.talleres.find(t => t.id === tallerId);

    this.edadInvalida = false;
    this.edadMinima = null;
    this.edadMaxima = null;

    if (!taller || edad == null) return;

    this.edadMinima = taller.edad_minima;
    this.edadMaxima = taller.edad_maxima;

    if (this.edadMinima !== null && this.edadMaxima !== null) {
      if (edad < this.edadMinima || edad > this.edadMaxima) {
        this.edadInvalida = true;
      }
    } else if (this.edadMinima !== null && edad < this.edadMinima) {
      this.edadInvalida = true;
    }
  }

  onSubmit() {
    if (this.inscripcionForm.invalid) {
      this.marcarCamposComoTouched(this.inscripcionForm);
      alert('❌ Hay campos incorrectos o vacíos. Verifica los campos resaltados en rojo.');
      return;
    }

    if (this.edadInvalida) {
      const edadMaxTexto = this.edadMaxima !== null ? this.edadMaxima : 'en adelante';
      alert(`❌ La edad no es válida para el taller seleccionado.\nRango permitido: ${this.edadMinima} a ${edadMaxTexto} años.`);
      return;
    }

    const datos = { ...this.inscripcionForm.value };
    delete datos.id;

    if (datos.fecha_nacimiento) {
      const fecha = new Date(datos.fecha_nacimiento);
      datos.fecha_nacimiento = fecha.toISOString().split('T')[0];
    }

    for (const key in datos) {
      if (datos[key] === '' || datos[key] === null) {
        delete datos[key];
      }
    }

    const tallerSeleccionado = this.talleres.find(t => t.id === datos.taller_id);
    if (tallerSeleccionado) {
      datos.taller_cultural = tallerSeleccionado.nombre;
    }

    if (this.router.url.includes('reinscripciones')) {
      this.actualizarReinscripcion(datos);
    } else {
      this.inscripcionService.registrarInscripcion(datos).subscribe({
        next: () => {
          alert('✅ Inscripción registrada con éxito');
          this.saltarseGuard = true;
          this.inscripcionForm.reset();
          this.router.navigate(['/registro/estatus-inscripciones']);
        },
        error: (err) => {
          console.error('❌ Error al registrar inscripción:', err);
          if (err.status === 400 && err.error && err.error.mensaje) {
            alert(err.error.mensaje);
          } else {
            alert('❌ Ocurrió un error al registrar la inscripción');
          }
        }
      });
    }
  }

  marcarCamposComoTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      if (campo === 'escuela_nueva') {
        return;
      }
      const control = formGroup.get(campo);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.marcarCamposComoTouched(control);
      }
    });
  }

  actualizarReinscripcion(datos: any) {
    this.inscripcionService.actualizarReinscripcion(datos).subscribe({
      next: () => {
        alert('✅ Reinscripción actualizada con éxito');
        this.saltarseGuard = true;
        this.inscripcionForm.reset();
        this.router.navigate(['/registro/estatus-reinscripciones']);
      },
      error: (err) => {
        console.error('❌ Error al actualizar reinscripción:', err);
        const mensaje = err.error?.mensaje || '❌ Ocurrió un error al actualizar la reinscripción';
        alert(mensaje);
      }
    });
  }

  @Input() alumnoId: number | null = null;

  cargarPorAlumnoId(alumnoId: number) {
    this.inscripcionService.getFormularioPorAlumno(alumnoId).subscribe({
      next: (data: any) => {
        this.inscripcionForm.patchValue(data);
        this.formularioBloqueado = true; // ✅ bloquea
        this.inscripcionForm.disable();  // ✅ bloquea
        this.tipoPago = 'reinscripción';
      },
      error: (err) => {
        console.warn('⚠️ No se encontró info para ese alumno:', err);
      }
    });
  }
}
