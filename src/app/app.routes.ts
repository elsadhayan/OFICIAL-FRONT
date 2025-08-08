import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InfoEmpresaComponent } from './page/info-empresa/info-empresa.component';
import { CrearcuentaComponent } from './page/crearcuenta/crearcuenta.component';
import { InicioSesionComponent } from './page/inicio-sesion/inicio-sesion.component';
import { PingLaravelComponent } from './pages/ping-laravel/ping-laravel/ping-laravel.component';
import { GestionarTalleresComponent } from './admin/gestionar-talleres/gestionar-talleres.component';
import { AlumnosComponent } from './instructor/alumnos/alumnos/alumnos.component';
import { UnsavedChangesGuard } from './guards/unsaved-changes.guard';
import { authGuard } from './guards/auth.guard'; // ✅ ruta correcta


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path:'nosotros', component:InfoEmpresaComponent
  },
  {
    path:'registro',component:CrearcuentaComponent
  },
  {
    path:'login',component:InicioSesionComponent
  },
  {
    path:'ping-laravel',component:PingLaravelComponent
  },

  {
    path: 'talleres/guitarra', loadComponent: () =>import('./pages/talleres/guitarra/guitarra.component').then(m => m.GuitarraComponent)
  },
  {
  path: 'talleres/ballet-clasico',loadComponent: () =>import('./pages/talleres/ballet-clasico/ballet-clasico.component').then(m => m.BalletClasicoComponent)
  },
{path: 'talleres/decoracionceramica', loadComponent:() => import('./pages/talleres/ceramica-deco/ceramica-deco.component').then(m =>m.CeramicaDecoComponent)
  },
  {
  path:'talleres/musica-solfeo',loadComponent:() => import('./pages/talleres/musica-solfeo/musica-solfeo.component').then(m =>m.MusicaSolfeoComponent)
  },
  {
  path: 'talleres/danza-folclorica',loadComponent:() => import('./pages/talleres/danza-folclorika-mexicana/danza-folclorika-mexicana.component').then(m =>m.DanzaFolclorikaMexicanaComponent)
  },
  {
  path:'talleres/dibujo-infantil',loadComponent:()=>import('./pages/talleres/dibujo-infantil/dibujo-infantil.component').then(m =>m.DibujoInfantilComponent)
  },
  {
    path: 'talleres/Marimba', loadComponent:()=>import('./pages/talleres/marimba/marimba.component').then(m=>m.MarimbaComponent)

  },
  {
    path:'talleres/fotografia',loadComponent:()=>import('./pages/talleres/fotografia/fotografia.component').then(m =>m.FotografiaComponent)
  },
{
  path:'talleres/dibujo-pintura',loadComponent:()=>import('./pages/talleres/dibujo-pintura/dibujo-pintura.component').then(m =>m.DibujoPinturaComponent)

},
  {
    path: 'admin', component: GestionarTalleresComponent
  },
  {
    path: 'instructor', component: AlumnosComponent
  },
 {
  path: 'registro/inscripciones',
  loadComponent: () =>
    import('./pages/registro-inscrp/inscripciones/inscripciones.component').then(m => m.InscripcionesComponent),
  canActivate: [authGuard], // <- aquí se aplica
  canDeactivate: [UnsavedChangesGuard] // si quieres dejarlo también
},

  {
    path:'registro/estatus-inscripciones',loadComponent:()=>import('./pages/registro-inscrp/estatus-inscripciones/estatus-inscripciones.component').then(m=>m.EstatusInscripcionesComponent)

  },
 {
  path: 'registro/reinscripciones',
  loadComponent: () =>
    import('./pages/registro-inscrp/reinscripciones/reinscripciones.component').then(
      (m) => m.ReinscripcionesComponent
    ),
  canActivate: [authGuard],          // 👉 Verifica si el usuario está logeado
  canDeactivate: [UnsavedChangesGuard] // 👉 Pregunta si quiere salir del formulario
},

  {
    path:'registro/estatus-reinscripciones',loadComponent:()=>import('./pages/registro-inscrp/estatus-reinscripciones/estatus-reinscripciones.component').then(m=>m.EstatusReinscripcionesComponent)


  }






];
