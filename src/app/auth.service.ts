import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) { }


pingLaravel(): Observable<any> {
  return this.http.get(`${this.baseUrl}/ping`);
}


  // Ejemplo de login
  login(data: { curp: string; contrasena: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  logout() {
  localStorage.removeItem('token');
}

}
