import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, SlickCarouselModule,MatCardModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  imagenes = [
    'assets/ba1.png',
    'assets/ba2.png',
    'assets/ba3.png',
    'assets/ba4.png'
  ];


  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: false
  };

  noticias = [
  {
    imagen: 'assets/card.png',
    descripcion: 'Evento cultural de danza tradicional'
  },
  {
    imagen: 'assets/card2.png',
    descripcion: 'Exposición artística infantil'
  },
   {
    imagen: 'assets/card2.png',
    descripcion: 'Exposición artística infantil'
  },
   {
    imagen: 'assets/card2.png',
    descripcion: 'Exposición artística infantil'
  },
   {
    imagen: 'assets/card2.png',
    descripcion: 'Exposición artística infantil'
  },
   {
    imagen: 'assets/card2.png',
    descripcion: 'Exposición artística infantil'
  },


];

}
