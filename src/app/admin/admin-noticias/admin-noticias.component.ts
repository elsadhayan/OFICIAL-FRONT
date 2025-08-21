import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface Noticia {
  id?: number;
  imagen: string;
  descripcion: string;
}
@Component({
  selector: 'app-admin-noticias',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-noticias.component.html',
  styleUrl: './admin-noticias.component.css'
})
export class AdminNoticiasComponent implements OnInit{
   noticias: Noticia[] = [];
  noticiaSeleccionada: Noticia = { imagen: '', descripcion: '' };

  private apiUrl = 'http://localhost:8000/api/noticias'; // Ajusta tu URL si es diferente

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  cargarNoticias(): void {
    this.http.get<Noticia[]>(this.apiUrl).subscribe({
      next: (data) => (this.noticias = data),
      error: (error) => console.error('Error al cargar noticias', error),
    });
  }

  guardarNoticia(): void {
    if (this.noticiaSeleccionada.id) {
      // Actualizar
      this.http
        .put(`${this.apiUrl}/${this.noticiaSeleccionada.id}`, this.noticiaSeleccionada)
        .subscribe({
          next: () => {
            this.cargarNoticias();
            this.cancelarEdicion();
          },
          error: (err) => console.error('Error al actualizar noticia', err),
        });
    } else {
      // Crear
      this.http.post(this.apiUrl, this.noticiaSeleccionada).subscribe({
        next: () => {
          this.cargarNoticias();
          this.cancelarEdicion();
        },
        error: (err) => console.error('Error al agregar noticia', err),
      });
    }
  }

  editarNoticia(noticia: Noticia): void {
    this.noticiaSeleccionada = { ...noticia };
  }

  eliminarNoticia(id: number | undefined): void {
    if (!id) return;
    if (confirm('¿Estás seguro de eliminar esta noticia?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => this.cargarNoticias(),
        error: (err) => console.error('Error al eliminar noticia', err),
      });
    }
  }

  cancelarEdicion(): void {
    this.noticiaSeleccionada = { imagen: '', descripcion: '' };
  }


}
