import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-estatus-reinscripciones',
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './estatus-reinscripciones.component.html',
  styleUrl: './estatus-reinscripciones.component.css'
})
export class EstatusReinscripcionesComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {

  }

  confirmarCerrarSesion(): void {
    const confirmar = confirm('¿Estás seguro de que deseas cerrar sesión?');
    if (confirmar) {
      localStorage.removeItem('usuario');
      alert('Sesión cerrada correctamente.');
      this.router.navigate(['/']);
    }
  }
  logout(): void {
    // limpia sesión básica (ajusta claves si usas otras)
    localStorage.removeItem('token');
    // localStorage.removeItem('usuario'); // si la usas
    // sessionStorage.clear(); // si guardas algo ahí

    // redirige (elige el que uses en tu app)
    this.router.navigate(['/home']); // o '/login'
  }
}
