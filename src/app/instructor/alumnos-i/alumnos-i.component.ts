import { Component,OnInit } from '@angular/core';
import { InstructorServicesServiceService } from '../../core/instructor-services-service.service';
import { AsistenciaServiceService } from '../../core/asistencia-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-alumnos-i',
  imports: [CommonModule],
  templateUrl: './alumnos-i.component.html',
  styleUrl: './alumnos-i.component.css'
})
export class AlumnosIComponent implements OnInit{
alumnos: any[] = [];
  loading = true;
  error = '';

  constructor(private AsistenciaServiceService: AsistenciaServiceService) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    const usuarioId = localStorage.getItem('usuario_id');

    if (!usuarioId) {
      this.error = 'No se encontró información de usuario';
      this.loading = false;
      return;
    }

    // ✅ Usar el método que ya existe y funciona
    this.AsistenciaServiceService.obtenerAlumnosPorInstructor(+usuarioId).subscribe({
      next: (alumnos) => {
        console.log('✅ Alumnos cargados:', alumnos);
        this.alumnos = alumnos || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error:', err);
        this.error = 'Error al cargar los alumnos';
        this.alumnos = [];
        this.loading = false;
      }
    });
  }
}
