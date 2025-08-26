import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from '../../services/asistencia.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {
  alumnos: any[] = [];
  loading = true;
  error = '';

  constructor(private asistenciaService: AsistenciaService) {}

  ngOnInit(): void {
    this.cargarAsistencias();
  }

  cargarAsistencias(): void {
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
      next: (data) => {
        console.log('✅ Alumnos para asistencia:', data);
        this.alumnos = Array.isArray(data) ? data : (data ? [data] : []);
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar asistencias:', err);
        this.error = 'Error al cargar asistencias';
        this.loading = false;
      }
    });
  }

  cambiarAsistencia(alumnoId: number, mes: number, value: boolean): void {
    if (mes < 1 || mes > 12) {
      console.warn('Mes inválido. Debe ser 1–12.');
      return;
    }

    const alumno = this.alumnos.find(a => a?.id === alumnoId);
    if (alumno) {
      // Ej. mes1, mes2, ..., mes12
      alumno[`mes${mes}`] = value;
    }

    this.asistenciaService.toggleAsistencia(alumnoId, mes, value).subscribe({
      next: () => console.log(`✅ Asistencia mes ${mes} actualizada para alumno ${alumnoId}`),
      error: (err) => console.error('❌ Error al actualizar asistencia', err)
    });
  }

  // 🔹 Guardar como imagen PNG
  captureAsPNG(): void {
    const element = document.querySelector('.table-responsive') as HTMLElement | null;
    if (!element) return;

    html2canvas(element).then(canvas => {
      const link = document.createElement('a');
      link.download = 'asistencia.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  // 🔹 Guardar como PDF
  captureAsPDF(): void {
    const element = document.querySelector('.table-responsive') as HTMLElement | null;
    if (!element) return;

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = (pdf as any).getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('asistencia.pdf');
    });
  }
}
