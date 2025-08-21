import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet,CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
   sidebarVisible = true;
 constructor (private router:Router){}
 verTaller(nombre:string){
  this.router.navigate(['/admin/gestionar-talleres'],{
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
