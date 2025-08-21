import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InstructorServicesServiceService {
  private baseUrl = `http://127.0.0.1:8000/api`
  constructor(private http: HttpClient) { }
  obtenerDatosInstructor(usuarioId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this.http.get(`${this.baseUrl}/instructor/datos/${usuarioId}`, { headers });
  }
  obtenerMisAlumnos(usuarioId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/instructor/mis-alumnos/${usuarioId}`, { headers });
  }

  actualizarPerfil(id: number, datos: any) {
  return this.http.put(`http://127.0.0.1:8000/api/usuario/perfil/${id}`, datos);
}


}
