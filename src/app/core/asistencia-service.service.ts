import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AsistenciaServiceService {
private baseUrl = `http://127.0.0.1:8000/api`;
    constructor(private http: HttpClient) {}
    private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  obtenerTallerDelMaestro(usuarioId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/instructor/taller-info/${usuarioId}`, { headers: this.getHeaders() });
  }
  // Método usando el endpoint que ya funciona
obtenerAlumnosPorInstructor(usuarioId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/instructor/alumnos-por-instructor/${usuarioId}`, { headers: this.getHeaders() });
}

  // Obtener alumnos con su asistencia por taller
  obtenerAsistenciasPorTaller(tallerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/asistencias/taller/${tallerId}`, { headers: this.getHeaders() });
  }

  // Marcar o desmarcar asistencia
  toggleAsistencia(alumnoId: number, mes: number, value: boolean): Observable<any> {
    return this.http.post(`${this.baseUrl}/asistencias/toggle`, {
      alumno_id: alumnoId,
      mes: mes,
      value: value
    }, { headers: this.getHeaders() });
  }

}
