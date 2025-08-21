// src/app/services/inscripcion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InscripcionService {
  private readonly API = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // ---------- helpers ----------
  private authHeaders(json = true): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    if (json) headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  // ---------- inscripciones (usuario) ----------
  registrarInscripcion(data: any): Observable<any> {
    return this.http.post(`${this.API}/inscripcion`, data, {
      headers: this.authHeaders(),
    });
  }

  obtenerDatosUsuario(): Observable<any> {
    return this.http.get(`${this.API}/inscripcion/usuario`, {
      headers: this.authHeaders(false),
    });
  }

  // ---------- reinscripción ----------
  actualizarReinscripcion(data: any): Observable<any> {
    return this.http.put(`${this.API}/reinscripcion`, data, {
      headers: this.authHeaders(),
    });
  }

  getAlumnosReinscripcion(): Observable<any> {
    return this.http.get(`${this.API}/reinscripcion/alumnos`, {
      headers: this.authHeaders(false),
    });
  }

  getFormularioPorAlumno(alumnoId: number): Observable<any> {
    return this.http.get(`${this.API}/reinscripcion/form/${alumnoId}`, {
      headers: this.authHeaders(false),
    });
  }

  // ---------- admin (pendientes / aceptar / rechazar) ----------
  obtenerPendientes(): Observable<any> {
    return this.http.get(`${this.API}/inscripciones/pendientes`, {
      headers: this.authHeaders(false),
    });
  }

  aceptarInscripcion(id: number): Observable<any> {
    return this.http.put(`${this.API}/inscripciones/aceptar/${id}`, {}, {
      headers: this.authHeaders(),
    });
  }

  rechazarInscripcion(id: number): Observable<any> {
    return this.http.delete(`${this.API}/inscripciones/rechazar/${id}`, {
      headers: this.authHeaders(false),
    });
  }
}
