import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-info-alumno',
  imports: [CommonModule,MatIconModule,MatButtonModule],
  templateUrl: './info-alumno.component.html',
  styleUrl: './info-alumno.component.css'
})
export class InfoAlumnoComponent {
  alumnoSeleccionado: any = null;
  cargando: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const alumnoId = params['alumnoId'];
      if (alumnoId) {
        this.cargarDatosAlumno(alumnoId);
      } else {
        this.error = 'No se proporcionó ID de alumno';
      }
    });
  }

  cargarDatosAlumno(id: number) {
    this.cargando = true;
    this.error = '';

    this.http.get(`http://127.0.0.1:8000/api/alumnos/${id}/completo`)
      .subscribe({
        next: (response: any) => {
          this.alumnoSeleccionado = response;
          this.cargando = false;
          console.log('Datos completos del alumno:', response);
        },
        error: (error) => {
          console.error('Error al obtener datos del alumno:', error);
          this.error = 'Error al cargar los datos del alumno';
          this.cargando = false;
        }
      });
  }

  volver() {
    this.router.navigate(['/admin-layout']);
  }

  volveer() {
  this.router.navigate(['/admin/gestionar-talleres']);
}

  editarAlumno() {
    // Función para futuras implementaciones de edición
    console.log('Editar alumno:', this.alumnoSeleccionado.id);
  }
}



