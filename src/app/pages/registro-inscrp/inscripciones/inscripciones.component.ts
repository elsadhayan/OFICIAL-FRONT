import { Component,OnInit } from '@angular/core';
import { InscripcionComponent } from "../../../inscripcion/inscripcion.component";
import { Router } from '@angular/router';
@Component({
  standalone:true,
  selector: 'app-inscripciones',
  imports: [InscripcionComponent],
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.css'
})
export class InscripcionesComponent  implements OnInit{

constructor(private router: Router) {}

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      alert('Debes iniciar sesión para acceder a esta página.');
      this.router.navigate(['/login']);
    }
  }

}
