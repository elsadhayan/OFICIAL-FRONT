import { Component } from '@angular/core';
import { TallerInfoComponent } from "../../../components/taller-info/taller-info.component";


@Component({
  standalone: true,
  selector: 'app-guitarra',
  imports: [TallerInfoComponent],
  templateUrl: './guitarra.component.html',
  styleUrl: './guitarra.component.css'
})
export class GuitarraComponent {

}
