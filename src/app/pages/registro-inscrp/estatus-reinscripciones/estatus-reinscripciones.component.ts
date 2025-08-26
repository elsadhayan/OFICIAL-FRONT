import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { InscripcionService, Inscripcion } from '../../../services/inscripcion.service';

@Component({
  standalone: true,
  selector: 'app-estatus-reinscripciones',
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './estatus-reinscripciones.component.html',
  styleUrls: ['./estatus-reinscripciones.component.css']
})
export class EstatusReinscripcionesComponent implements OnInit {
  loading = false;
  reinscripciones: Inscripcion[] = [];

  constructor(private router: Router, private insSrv: InscripcionService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.loading = true;
    this.insSrv.misInscripciones().subscribe({
      next: (data) => {
        this.reinscripciones = data || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // La reinscripción más reciente
  get ultima(): Inscripcion | null {
    return this.reinscripciones.length ? this.reinscripciones[0] : null;
  }

  estadoClase(e?: string) {
    switch ((e || '').toLowerCase()) {
      case 'aceptada':  return 'estado aceptada';
      case 'rechazada': return 'estado rechazada';
      default:          return 'estado pendiente';
    }
  }

  estadoTexto(e?: string) {
    switch ((e || '').toLowerCase()) {
      case 'aceptada':  return 'ACEPTADA';
      case 'rechazada': return 'RECHAZADA';
      default:          return 'PENDIENTE POR REVISAR';
    }
  }

  irPagos() {
    this.router.navigate(['/mis-pagos']);
  }

}
