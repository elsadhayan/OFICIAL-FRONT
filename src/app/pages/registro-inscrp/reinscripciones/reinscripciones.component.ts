import { Component, OnInit, ViewChild } from '@angular/core';
import { InscripcionComponent } from '../../../inscripcion/inscripcion.component';
import { Router } from '@angular/router';
import { CanExit } from '../../../guards/unsaved-changes.guard';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { InscripcionService } from '../../../services/inscripcion.service';

@Component({
  standalone: true,
  selector: 'app-reinscripciones',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    InscripcionComponent
  ],
  templateUrl: './reinscripciones.component.html',
  styleUrl: './reinscripciones.component.css'
})
export class ReinscripcionesComponent implements OnInit, CanExit {

  @ViewChild(InscripcionComponent) inscripcionComponent!: InscripcionComponent;

  alumnos: { id: number; nombre: string }[] = [];
  selectedAlumnoId: number | null = null;

  constructor(private router: Router, private inscSvc: InscripcionService) {}

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      alert('Debes iniciar sesión para acceder a esta página.');
      this.router.navigate(['/login']);
      return;
    }

    // cargar lista de alumnos del usuario
    this.inscSvc.getAlumnosReinscripcion().subscribe({
      next: (lista: any) => {
        this.alumnos = (lista || []).map((x: any) => ({ id: x.id, nombre: x.nombre }));
        this.selectedAlumnoId = this.alumnos[0]?.id ?? null;
      },
      error: (e) => console.error(e),
    });
  }

  cargarAlumnoSeleccionado() {
    // El @Input() en <app-inscripcion> se actualiza con selectedAlumnoId;
    // si quieres forzar recarga interna:
    if (this.inscripcionComponent && this.selectedAlumnoId) {
      this.inscripcionComponent.cargarPorAlumnoId(this.selectedAlumnoId);
    }
  }

  canExit(): boolean {
    return this.inscripcionComponent?.canExit();
  }
}
