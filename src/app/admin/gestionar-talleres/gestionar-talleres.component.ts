import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gestionar-talleres',
  imports: [CommonModule,MatIconModule],
  templateUrl: './gestionar-talleres.component.html',
  styleUrl: './gestionar-talleres.component.css'
})
export class GestionarTalleresComponent {
  alumnos :any []=[];
constructor(
    private route:ActivatedRoute,
    private http: HttpClient,
    private router:Router
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
 // Función para ver detalles del alumno

 verDetallesAlumno(alumno: any) {
    // Navegar al componente info-alumno dentro del área de admin
    this.router.navigate(['/admin/info-alumno'], {
      queryParams: {
        alumnoId: alumno.id
      }
    });
  }

  // Función para cerrar el modal de detalles




eliminarAlumno(alumno: any) {
    // Confirmación antes de eliminar
    if (confirm(`¿Estás seguro de que deseas eliminar al alumno ${alumno.nombres} ${alumno.apellido_paterno}?`)) {
      this.http.delete(`http://127.0.0.1:8000/api/alumnos/${alumno.id}`)
        .subscribe({
          next: (response) => {
            console.log('Alumno eliminado correctamente', response);
            // Actualizar la lista eliminando el alumno del array local
            this.alumnos = this.alumnos.filter(a => a.id !== alumno.id);
            alert('Alumno eliminado correctamente');
          },
          error: (error) => {
            console.error('Error al eliminar alumno:', error);
            alert('Error al eliminar el alumno. Por favor, inténtalo de nuevo.');
          }
        });
    }
  }


}
