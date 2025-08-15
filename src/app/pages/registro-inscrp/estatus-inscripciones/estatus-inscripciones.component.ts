import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-estatus-inscripciones',
  imports: [MatIconModule, MatButtonModule,RouterModule],
  templateUrl: './estatus-inscripciones.component.html',
  styleUrl: './estatus-inscripciones.component.css'
})
export class EstatusInscripcionesComponent implements OnInit {

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
