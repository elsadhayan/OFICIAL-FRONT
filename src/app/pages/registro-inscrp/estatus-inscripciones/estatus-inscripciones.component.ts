// src/app/registro/estatus-inscripciones/estatus-inscripciones.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { InscripcionService, Inscripcion } from '../../../services/inscripcion.service';

@Component({
  standalone: true,
  selector: 'app-estatus-inscripciones',
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './estatus-inscripciones.component.html',
  styleUrls: ['./estatus-inscripciones.component.css']
})
export class EstatusInscripcionesComponent implements OnInit {
  loading = false;
  inscripciones: Inscripcion[] = [];

  constructor(private router: Router, private insSrv: InscripcionService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.loading = true;
    this.insSrv.misInscripciones().subscribe({
      next: data => { this.inscripciones = data; this.loading = false; },
      error: _ => { this.loading = false; }
    });
  }

  // La más reciente para la tarjeta principal
  get ultima(): Inscripcion | null {
    return this.inscripciones.length ? this.inscripciones[0] : null;
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

  irPagos() { this.router.navigate(['/mis-pagos']); }


}
