import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet,Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-instructor-layout',
  imports: [RouterOutlet,CommonModule,RouterLink,RouterLinkActive, MatTableModule],
  templateUrl: './instructor-layout.component.html',
  styleUrl: './instructor-layout.component.css'
})
export class InstructorLayoutComponent {
sidebarVisible = true;
   constructor (private router:Router){}
toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
  perfil(){
    localStorage
    this.router.navigate(['mis-talleres'])
  }
  cerrar(){
    localStorage.clear();
    this.router.navigate(['login'])

}

}
