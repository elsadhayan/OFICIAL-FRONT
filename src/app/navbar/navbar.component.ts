import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, CommonModule, MatMenuModule, MatDividerModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuActivo = false;
  mostrarNavbar = true;

  private rutasOcultas = ['/admin', '/instructor', '/director'];

  constructor(private router: Router) {
    // Mostrar/ocultar navbar según ruta
    this.actualizarVisibilidad(this.router.url);

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const url = e.urlAfterRedirects || e.url;
        this.actualizarVisibilidad(url);
        // 🔒 Cierra el menú móvil siempre que cambies de ruta
        this.menuActivo = false;
      });
  }

  private actualizarVisibilidad(url: string) {
    this.mostrarNavbar = !this.rutasOcultas.some(base => url.startsWith(base) || url.includes(`${base}/`));
  }

  toggleMenu() { this.menuActivo = !this.menuActivo; }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.menuActivo = false; // por si estaba abierto
    this.router.navigate(['/login']);
  }

  talleres = [
    { nombre: 'Taller de guitarra', ruta: '/talleres/guitarra', icono: 'music_note' },
    { nombre: 'Taller de Música y Solfeo', ruta: '/talleres/musica-solfeo', icono: 'library_music' },
    { nombre: 'Taller de Dibujo Infantil', ruta: '/talleres/dibujo-infantil', icono: 'brush' },
    { nombre: 'Taller de Fotografía', ruta: '/talleres/fotografia', icono: 'photo_camera' },
    { nombre: 'Danza Folclórica', ruta: '/talleres/danza-folclorica', icono: 'emoji_people' },
    { nombre: 'Ballet Clásico', ruta: '/talleres/ballet-clasico', icono: 'sports_gymnastics' },
    { nombre: 'Decoración en Cerámica', ruta: '/talleres/decoracionceramica', icono: 'filter_vintage' },
    { nombre: 'Marimba', ruta: '/talleres/Marimba', icono: 'queue_music' },
    { nombre: 'Dibujo y Pintura', ruta: '/talleres/dibujo-pintura', icono: 'palette' },
  ];

  inscripciones = [
    { nombre: 'Periodo cuatrimestral', ruta: '/inscripciones/cuatrimestral', icono: 'event' },
  ];
}
