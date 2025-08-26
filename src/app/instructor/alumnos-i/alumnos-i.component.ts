import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsistenciaComponent } from '../asistencia/asistencia.component';
import { AsistenciaService } from '../../services/asistencia.service';

@Component({
  selector: 'app-alumnos-i',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alumnos-i.component.html',
  styleUrls: ['./alumnos-i.component.css']
})
export class AlumnosIComponent implements OnInit {
  alumnos: any[] = [];
  loading = true;
  error = '';

  constructor(private asistenciaService: AsistenciaService) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    const usuarioIdStr = localStorage.getItem('usuario_id');

    if (!usuarioIdStr) {
      this.error = 'No se encontró información de usuario';
      this.loading = false;
      return;
    }

    const usuarioId = Number(usuarioIdStr);
    if (Number.isNaN(usuarioId)) {
      this.error = 'ID de usuario inválido';
      this.loading = false;
      return;
    }

    this.asistenciaService.obtenerAlumnosPorInstructor(usuarioId).subscribe({
      next: (alumnos) => {
        console.log('✅ Alumnos cargados:', alumnos);
        this.alumnos = Array.isArray(alumnos) ? alumnos : (alumnos ? [alumnos] : []);
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
