import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestion',
  imports: [CommonModule],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionComponent {
  alumnos :any []=[];

  constructor(
    private route:ActivatedRoute,
    private http: HttpClient
  ){}

  ngOnInit(){
    this.route.queryParams.subscribe(params =>{
      const nombreTaller = params['nombre'];
      if(nombreTaller){
        this.obtenerTaller(nombreTaller);
      }
    });
  }
  obtenerTaller(nombre:string){
    this.http.get<any[]>('http://127.0.0.1:8000/api/talleres')
    .subscribe(talleres =>{
      const taller = talleres.find(t=> t.nombre_taller.toLowerCase() === nombre.toLowerCase());
      if (taller){
        this.obtenerAlumnos(taller.id);
      }
    });
  }

  obtenerAlumnos(id: number) {
  this.http.get<any[]>(`http://127.0.0.1:8000/api/talleres/${id}/alumnos`)
    .subscribe(alumnos => {
      this.alumnos = alumnos;
      console.log("Alumnos recibidos:", alumnos); // <- agrega esto
    });

}
}
