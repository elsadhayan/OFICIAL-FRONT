import { Component } from '@angular/core';
import { TallerInfoComponent } from "../../../components/taller-info/taller-info.component";


@Component({
  standalone: true,
  selector: 'app-ballet-clasico',
  imports: [TallerInfoComponent],
  templateUrl: './ballet-clasico.component.html',
  styleUrl: './ballet-clasico.component.css'
})
export class BalletClasicoComponent {

}
