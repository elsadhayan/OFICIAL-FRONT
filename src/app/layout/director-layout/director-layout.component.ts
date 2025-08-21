import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-director-layout',
  imports: [CommonModule,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './director-layout.component.html',
  styleUrl: './director-layout.component.css'
})
export class DirectorLayoutComponent {
  sidebarVisible = true;
  constructor (private router:Router){}
  verTaller(nombre:string){
  this.router.navigate(['/director/gestion'],{
    queryParams:{nombre}
  })
 }
 toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  cerrar(){
    localStorage.clear();
    this.router.navigate(['login'])

  }
  perfil(){

    this.router.navigate(['perfil'])

  }

}
