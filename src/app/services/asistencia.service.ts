import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AsistenciaService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  obtenerTallerDelMaestro(usuarioId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/instructor/taller-info/${usuarioId}`, {
      headers: this.getHeaders(),
    });
  }

  // Endpoint que ya funciona
  obtenerAlumnosPorInstructor(usuarioId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/instructor/alumnos-por-instructor/${usuarioId}`, {
      headers: this.getHeaders(),
    });
  }

  // Obtener alumnos con su asistencia por taller
  obtenerAsistenciasPorTaller(tallerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/asistencias/taller/${tallerId}`, {
      headers: this.getHeaders(),
    });
  }

  // Marcar o desmarcar asistencia
  toggleAsistencia(alumnoId: number, mes: number, value: boolean): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/asistencias/toggle`,
      { alumno_id: alumnoId, mes, value },
      { headers: this.getHeaders() }
    );
  }
}
