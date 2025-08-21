import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
export interface HorarioData {
  maestro_id: number;  // Cambiado para coincidir con la BD
  taller_id: number;   // Cambiado para coincidir con la BD
  horarios: {
    dia_semana: string;
    hora_inicio: string;
    hora_fin: string;
    grupo: string;
    salon_id?: number | null;  // Cambiado para coincidir con la BD
  }[];

}

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private apiUrl ='http://localhost:8000/api/horarios';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los horarios de un maestro específico
   */
  getHorarios(id_maestro: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id_maestro}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Guarda nuevos horarios para un maestro
   */
  saveHorarios(data: HorarioData): Observable<any> {
    return this.http.post(this.apiUrl, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Actualiza los horarios existentes de un maestro
   */
  updateHorarios(id_maestro: number, data: HorarioData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id_maestro}`, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Elimina todos los horarios de un maestro
   */
  deleteHorarios(id_maestro: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id_maestro}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Manejo de errores HTTP
   */
  private handleError(error: any): Observable<never> {
    console.error('Error en HorarioService:', error);

    let errorMessage = 'Ha ocurrido un error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;

      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    }

    return throwError(() => new Error(errorMessage));
  }



}
