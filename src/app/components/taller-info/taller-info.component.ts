import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-taller-info',
  imports: [CommonModule],
  templateUrl: './taller-info.component.html',
  styleUrl: './taller-info.component.css'
})
export class TallerInfoComponent {
  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() imagen: string = '';
  @Input() instructor: string = '';
  @Input() profesion: string = '';
  @Input() horarios: string[][] = [];
  @Input() imagenInstructor: string = '';
}
