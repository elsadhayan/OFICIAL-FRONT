import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, CommonModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mensaje: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ mensaje: string }>('http://127.0.0.1:8000/api/ping')
      .subscribe({
        next: (res) => {
          this.mensaje = res.mensaje;
          console.log(this.mensaje);
        },
        error: (err) => {
          console.error('Error al conectar con Laravel:', err);
        }
      });
  }
}
