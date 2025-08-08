import { Component, OnInit, ViewChild } from '@angular/core';
import { InscripcionComponent } from '../../../inscripcion/inscripcion.component';
import { Router } from '@angular/router';
import { CanExit } from '../../../guards/unsaved-changes.guard'; // 👈 importa la interfaz

@Component({
  standalone: true,
  selector: 'app-reinscripciones',
  imports: [InscripcionComponent],
  templateUrl: './reinscripciones.component.html',
  styleUrl: './reinscripciones.component.css'
})
export class ReinscripcionesComponent implements OnInit, CanExit {  // 👈 implementa la interfaz

  @ViewChild(InscripcionComponent) inscripcionComponent!: InscripcionComponent;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      alert('Debes iniciar sesión para acceder a esta página.');
      this.router.navigate(['/login']);
    }
  }

  canExit(): boolean {
    return this.inscripcionComponent?.canExit();  // 👈 usa el método del componente del formulario
  }
}
