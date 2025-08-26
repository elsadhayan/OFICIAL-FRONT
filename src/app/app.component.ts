import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showNavbar = true;
  mensaje = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Ping al backend (tu puerto 8000)
    this.http.get<any>('http://127.0.0.1:8000/api/ping').subscribe({
      next: (res) => {
        this.mensaje = res?.mensaje ?? res?.message ?? (res?.ok ? 'ok' : '');
        console.log('Ping:', this.mensaje, res);
      },
      error: (err) => console.error('Error al conectar con Laravel:', err)
    });

    // Mostrar/ocultar navbar según la ruta
    const apply = (url: string) => {
      this.showNavbar = !this.hideNavbarFor(url);
    };
    apply(this.router.url); // evalúa también en la primera carga

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => apply(e.urlAfterRedirects || e.url));
  }

  private hideNavbarFor(url: string): boolean {
    // Oculta en /director y todas sus subrutas.
    // Agrega más prefijos si quieres ocultarlo en otras secciones.
    return url.startsWith('/director');
    // Ejemplo ampliado:
    // return ['/director', '/administrador'].some(p => url.startsWith(p));
  }
}
