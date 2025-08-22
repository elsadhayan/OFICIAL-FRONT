import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { InscripcionService,Inscripcion } from '../../../services/inscripcion.service';

@Component({
  standalone: true,
  selector: 'app-estatus-reinscripciones',
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './estatus-reinscripciones.component.html',
  styleUrl: './estatus-reinscripciones.component.css'
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
        // Solo reinscripciones (robusto ante acentos/casos)
        this.reinscripciones = (data || []).filter(i =>
          (i?.tipo_pago || '').toLowerCase().includes('reins')
        );
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  // La más reciente para la tarjeta principal
  get ultima(): Inscripcion | null {
    return this.reinscripciones.length ? this.reinscripciones[0] : null;
  }

  estadoClase(e?: string) {
    switch ((e || '').toLowerCase()) {
      case 'aceptada':  return 'estado-chip aceptada';
      case 'rechazada': return 'estado-chip rechazada';
      default:          return 'estado-chip pendiente';
    }
  }

  estadoTexto(e?: string) {
    switch ((e || '').toLowerCase()) {
      case 'aceptada':  return 'ACEPTADA';
      case 'rechazada': return 'RECHAZADA';
      default:          return 'PENDIENTE POR REVISAR';
    }
  }

  confirmarCerrarSesion(): void {
    const confirmar = confirm('¿Estás seguro de que deseas cerrar sesión?');
    if (confirmar) {
      localStorage.removeItem('usuario');
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  irPagos() { this.router.navigate(['/mis-pagos']); }
}
