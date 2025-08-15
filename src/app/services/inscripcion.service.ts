import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private apiUrl = 'http://127.0.0.1:8000/api/inscripcion';

  constructor(private http: HttpClient) { }

  registrarInscripcion(data: any): Observable<any> {
    const token = localStorage.getItem('token'); // recupera el token guardado

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, data, { headers });


  }
obtenerDatosUsuario(): Observable<any> {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get('http://127.0.0.1:8000/api/inscripcion/usuario', { headers });
}
actualizarReinscripcion(data: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.put('http://127.0.0.1:8000/api/reinscripcion', data, { headers });
}
getAlumnosReinscripcion() {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  return this.http.get('http://127.0.0.1:8000/api/reinscripcion/alumnos', { headers });
}

getFormularioPorAlumno(alumnoId: number) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  return this.http.get(`http://127.0.0.1:8000/api/reinscripcion/form/${alumnoId}`, { headers });
}


}
