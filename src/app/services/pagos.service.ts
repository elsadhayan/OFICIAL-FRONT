import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pago {
  id: number;
  folio: string;
  monto: string | number;
  estado: string;
  tipo_pago: 'inscripcion' | 'reinscripcion' | 'mensualidad';
  fecha_emision: string;
  fecha_vencimiento: string;
  alumno_id: number;
  alumno_nombre: string;
  concepto: string;        // viene del backend
  descripcion: string;     // viene del backend
  pdf_url: string | null;  // viene del backend
}
@Injectable({ providedIn: 'root' })
export class PagosService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  private headers(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getMisPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.baseUrl}/pagos/mis`, {
      headers: this.headers(),
    });
  }

  downloadPdf(pago: Pago): Observable<Blob> {
    if (!pago.pdf_url) throw new Error('Este pago no tiene PDF disponible');
    return this.http.get(pago.pdf_url, {
      headers: this.headers(),
      responseType: 'blob',
    });
  }

  descargarOrdenIR(alumnoId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/pagos/pdf/${alumnoId}`, {
      headers: this.headers(),
      responseType: 'blob',
    });
  }

 descargarOrdenMensualidad(alumnoId: number): Observable<Blob> {
  return this.http.get(`${this.baseUrl}/pagos/pdf/mensualidad/alumno/${alumnoId}`, {
    headers: this.headers(),
    responseType: 'blob',
  });
}

}

