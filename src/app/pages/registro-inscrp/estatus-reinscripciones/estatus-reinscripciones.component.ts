import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-estatus-reinscripciones',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './estatus-reinscripciones.component.html',
  styleUrl: './estatus-reinscripciones.component.css'
})
export class EstatusReinscripcionesComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      alert('Debes iniciar sesión para acceder a esta página.');
      this.router.navigate(['/login']);
    }
  }

  confirmarCerrarSesion(): void {
    const confirmar = confirm('¿Estás seguro de que deseas cerrar sesión?');
    if (confirmar) {
      localStorage.removeItem('usuario');
      alert('Sesión cerrada correctamente.');
      this.router.navigate(['/']);
    }
  }
}
