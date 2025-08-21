import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { InscripcionService } from '../../services/inscripcion.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-inscripcionad',
  imports: [CommonModule,MatIconModule],
  templateUrl: './inscripcionad.component.html',
  styleUrl: './inscripcionad.component.css'
})
export class InscripcionadComponent {
  inscripciones :any[]=[];
constructor(
  private route:ActivatedRoute,
  private http:HttpClient,
  private inscripcionService:InscripcionService
){}
  ngOnInit() {
  this.cargarInscripciones();
}

cargarInscripciones() {
  this.inscripcionService.obtenerPendientes().subscribe(data => {
    this.inscripciones = data;
  });
}

aceptar(id: number) {
  this.inscripcionService.aceptarInscripcion(id).subscribe(() => this.cargarInscripciones());
}

rechazar(id: number) {
  this.inscripcionService.rechazarInscripcion(id).subscribe(() => this.cargarInscripciones());
}


}
