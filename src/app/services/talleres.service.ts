import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments';
@Injectable({ providedIn: 'root' })
export class TalleresService {
  private base = `${environment.apiBase}/talleres`;

  constructor(private http: HttpClient) {}

  // Listar (con filtros opcionales)
  getTalleres(q?: string, soloDisponibles: boolean = false): Observable<any> {
    const params: any = {};
    if (q) params.q = q;
    if (soloDisponibles) params.solo_disponibles = true;
    return this.http.get(this.base, { params });
  }

  // Detalle (incluye inscritos y disponibilidad)
  getTaller(id: number): Observable<any> {
    return this.http.get(`${this.base}/${id}`);
  }

  // Crear
  createTaller(data: any): Observable<any> {
    return this.http.post(this.base, data);
  }

  // Actualizar
  updateTaller(id: number, data: any): Observable<any> {
    return this.http.put(`${this.base}/${id}`, data);
  }

  // Eliminar
  deleteTaller(id: number): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }

  // Disponibilidad rápida
  getDisponibilidad(id: number): Observable<any> {
    return this.http.get(`${this.base}/${id}/disponibilidad`);
  }
}
