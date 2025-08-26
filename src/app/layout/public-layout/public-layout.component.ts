import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";


@Component({
  standalone: true,
  selector: 'app-public-layout',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css'
})
export class PublicLayoutComponent {

}
