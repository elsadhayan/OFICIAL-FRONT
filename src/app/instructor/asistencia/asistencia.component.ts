import { Component, OnInit } from '@angular/core';
import { AsistenciaServiceService } from '../../core/asistencia-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asistencia',
  imports: [CommonModule],
  templateUrl: './asistencia.component.html',
  styleUrl: './asistencia.component.css'
})
export class AsistenciaComponent  implements OnInit{
  alumnos: any[] = [];
  tallerId: number = 1;
  constructor(private AsistenciaServiceService: AsistenciaServiceService) {}
  ngOnInit(): void {
    this.cargarAsistencias();
  }

  cargarAsistencias() {
    this.AsistenciaServiceService.obtenerAsistenciasPorTaller(this.tallerId).subscribe({
      next: (data) => {
        this.alumnos = data;
      },
      error: (err) => console.error('Error al cargar asistencias', err)
    });
  }

  cambiarAsistencia(alumnoId: number, mes: number, value: boolean) {
    // Cambiar el valor en la vista inmediatamente
    const alumno = this.alumnos.find(a => a.id === alumnoId);
    if (alumno) {
      alumno[`mes${mes}`] = value;
    }

    // Enviar cambio al backend
    this.AsistenciaServiceService.toggleAsistencia(alumnoId, mes, value).subscribe({
      next: () => console.log(`Asistencia mes ${mes} actualizada para alumno ${alumnoId}`),
      error: (err) => console.error('Error al actualizar asistencia', err)
    });
  }
}
