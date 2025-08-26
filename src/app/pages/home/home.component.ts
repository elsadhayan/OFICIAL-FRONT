import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatCardModule } from '@angular/material/card';


@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, SlickCarouselModule,MatCardModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  imagenes = [
    'assets/carrusel 1.jpg',
    'assets/carrusel 3.jpg',
    'assets/carrusel 2.jpg',
    'assets/carrusel 8.jpg'
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
    imagen: 'assets/CARD1.jpg',
    descripcion: '"El taller de dibujo y pintura es un espacio donde cada trazo y cada color se convierten en una forma de expresión personal. Más que aprender técnicas, se trata de descubrir que el arte no solo se ve, también se siente, y que en cada obra dejamos un pedacito de lo que somos."'
  },
  {
    imagen: 'assets/CARD4.jpg',
    descripcion: '"La música es el eco del alma; un idioma sin fronteras que puede hablar de amor, dolor, esperanza y alegría sin pronunciar una sola palabra. Es el arte que nos recuerda que, sin importar de dónde venimos, todos podemos vibrar en la misma melodía."'
  },
   {
    imagen: 'assets/CARD3.jpg',
    descripcion: '"La marimba es más que un instrumento; es un puente entre nuestras raíces y el presente. En cada golpe de sus teclas resuena la historia, la alegría y el orgullo de nuestra tierra, recordándonos que la música también es identidad."'
  },


];

}
