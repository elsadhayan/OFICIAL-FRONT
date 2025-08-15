import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagosService, Pago } from '../../../services/pagos.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-pagos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './mis-pagos.component.html',
  styleUrls: ['./mis-pagos.component.css'],
})
export class MisPagosComponent implements OnInit {
  loading = false;
  dataSource = new MatTableDataSource<Pago>([]);
  displayedColumns = [
    'folio',
    'alumno_nombre',
    'concepto',
    'descripcion',
    'monto',
    'estado',
    'fecha_emision',
    'acciones',
  ];

  alumnos: { id: number; nombre: string }[] = [];
  selectedAlumnoIdIR: number | null = null;
  selectedAlumnoIdMensual: number | null = null;

  // ✅ Inyectar Router como propiedad
  constructor(private pagosSvc: PagosService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.dataSource.filterPredicate = (data: Pago, filter: string) => {
      const t = (v: any) => (v ?? '').toString().toLowerCase();
      return [
        t(data.folio),
        t(data.alumno_nombre),
        t(data.concepto),
        t(data.descripcion),
        t(data.estado),
        t(data.fecha_emision),
      ].join(' ').includes(filter);
    };

    this.cargarPagos();
  }

  cargarPagos() {
    this.pagosSvc.getMisPagos().subscribe({
      next: (pagos) => {
        this.dataSource.data = pagos;

        const map = new Map<number, string>();
        pagos.forEach(p => {
          if (p.alumno_id != null) {
            map.set(p.alumno_id, p.alumno_nombre ?? `Alumno ${p.alumno_id}`);
          }
        });
        this.alumnos = Array.from(map, ([id, nombre]) => ({ id, nombre }));

        this.selectedAlumnoIdIR = this.alumnos[0]?.id ?? null;
        this.selectedAlumnoIdMensual = this.alumnos[0]?.id ?? null;
      },
      error: (err) => console.error(err),
      complete: () => (this.loading = false),
    });
  }

  aplicarFiltro(event: Event) {
    const value = (event.target as HTMLInputElement).value ?? '';
    this.dataSource.filter = value.trim().toLowerCase();
  }

  descargar(pago: Pago) {
    if (!pago.pdf_url) return;
    this.pagosSvc.downloadPdf(pago).subscribe({
      next: (blob) => {
        const nombre = `${(pago.concepto || 'pago')}_${(pago.folio || pago.id)}.pdf`;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = nombre;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        alert('No se pudo descargar el PDF');
        console.error(err);
      },
    });
  }

  generarOrdenIR() {
    if (!this.selectedAlumnoIdIR) return;
    this.pagosSvc.descargarOrdenIR(this.selectedAlumnoIdIR).subscribe({
      next: () => this.cargarPagos(),
      error: () => alert('No se pudo generar la orden de Inscripción/Reinscripción.'),
    });
  }

  generarOrdenMensualidad() {
    if (!this.selectedAlumnoIdMensual) return;
    this.pagosSvc.descargarOrdenMensualidad(this.selectedAlumnoIdMensual).subscribe({
      next: () => this.cargarPagos(),
      error: () => alert('No se pudo generar la orden de Mensualidad.'),
    });
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // o '/' si prefieres ir al home
  }
}
