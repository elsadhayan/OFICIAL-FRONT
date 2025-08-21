// src/app/app.routes.ts
import { Routes } from '@angular/router';

// Layouts
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DirectorLayoutComponent } from './layout/director-layout/director-layout.component';
import { InstructorLayoutComponent } from './layout/instructor-layout/instructor-layout.component';

// Guards (auth por rol y de formularios)
import { adminGuard } from './core/admin.guard';
import { directorGuard } from './core/director.guard';
import { instructorGuard } from './core/instructor.guard';
import { authGuard } from './guards/auth.guard';
import { UnsavedChangesGuard } from './guards/unsaved-changes.guard';

// Públicos
import { HomeComponent } from './pages/home/home.component';
import { InfoEmpresaComponent } from './page/info-empresa/info-empresa.component';
import { CrearcuentaComponent } from './page/crearcuenta/crearcuenta.component';
import { InicioSesionComponent } from './page/inicio-sesion/inicio-sesion.component';
import { PingLaravelComponent } from './pages/ping-laravel/ping-laravel/ping-laravel.component';


export const routes: Routes = [
  // ----- Sección pública -----
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'nosotros', component: InfoEmpresaComponent },
      { path: 'registro', component: CrearcuentaComponent },
      { path: 'login', component: InicioSesionComponent },
      { path: 'ping-laravel', component: PingLaravelComponent },
    {
  path: 'mis-pagos',
  loadComponent: () => import('./features/pagos/mis-pagos/mis-pagos.component').then(m => m.MisPagosComponent),
  canActivate: [authGuard]
},


      // Talleres (públicos)
      { path: 'talleres/guitarra', loadComponent: () => import('./pages/talleres/guitarra/guitarra.component').then(m => m.GuitarraComponent) },
      { path: 'talleres/ballet-clasico', loadComponent: () => import('./pages/talleres/ballet-clasico/ballet-clasico.component').then(m => m.BalletClasicoComponent) },
      { path: 'talleres/decoracionceramica', loadComponent: () => import('./pages/talleres/ceramica-deco/ceramica-deco.component').then(m => m.CeramicaDecoComponent) },
      { path: 'talleres/musica-solfeo', loadComponent: () => import('./pages/talleres/musica-solfeo/musica-solfeo.component').then(m => m.MusicaSolfeoComponent) },
      { path: 'talleres/danza-folclorica', loadComponent: () => import('./pages/talleres/danza-folclorika-mexicana/danza-folclorika-mexicana.component').then(m => m.DanzaFolclorikaMexicanaComponent) },
      { path: 'talleres/dibujo-infantil', loadComponent: () => import('./pages/talleres/dibujo-infantil/dibujo-infantil.component').then(m => m.DibujoInfantilComponent) },
      { path: 'talleres/Marimba', loadComponent: () => import('./pages/talleres/marimba/marimba.component').then(m => m.MarimbaComponent) },
      { path: 'talleres/fotografia', loadComponent: () => import('./pages/talleres/fotografia/fotografia.component').then(m => m.FotografiaComponent) },
      { path: 'talleres/dibujo-pintura', loadComponent: () => import('./pages/talleres/dibujo-pintura/dibujo-pintura.component').then(m => m.DibujoPinturaComponent) },

      // Registro / Inscripciones protegidas por login
      {
        path: 'registro/inscripciones',
        loadComponent: () => import('./pages/registro-inscrp/inscripciones/inscripciones.component').then(m => m.InscripcionesComponent),
        canActivate: [authGuard],
        canDeactivate: [UnsavedChangesGuard],
      },
      {
        path: 'registro/estatus-inscripciones',
        loadComponent: () => import('./pages/registro-inscrp/estatus-inscripciones/estatus-inscripciones.component').then(m => m.EstatusInscripcionesComponent),
        canActivate: [authGuard],
      },
      {
        path: 'registro/reinscripciones',
        loadComponent: () => import('./pages/registro-inscrp/reinscripciones/reinscripciones.component').then(m => m.ReinscripcionesComponent),
        canActivate: [authGuard],
        canDeactivate: [UnsavedChangesGuard],
      },
      {
        path: 'registro/estatus-reinscripciones',
        loadComponent: () => import('./pages/registro-inscrp/estatus-reinscripciones/estatus-reinscripciones.component').then(m => m.EstatusReinscripcionesComponent),
        canActivate: [authGuard],
      },
    ],
  },

  // ----- Sección privada: ADMIN -----
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    data: { rol: 'administrador' },
    children: [
      { path: '', redirectTo: 'gestionar-talleres', pathMatch: 'full' },
      { path: 'gestionar-talleres', loadComponent: () => import('./admin/gestionar-talleres/gestionar-talleres.component').then(m => m.GestionarTalleresComponent) },
      { path: 'inscripcionad', loadComponent: () => import('./admin/inscripcionad/inscripcionad.component').then(m => m.InscripcionadComponent) },
      { path: 'info-alumno', loadComponent: () => import('./admin/info-alumno/info-alumno.component').then(m => m.InfoAlumnoComponent) },


    ],
  },

  // ----- Sección privada: INSTRUCTOR -----
  {
    path: 'instructor',
    component: InstructorLayoutComponent,
    canActivate: [instructorGuard],
    data: { rol: 'maestro' },
    children: [
      { path: '', redirectTo: 'alumnos-i', pathMatch: 'full' },
      { path: 'alumnos-i', loadComponent: () => import('./instructor/alumnos-i/alumnos-i.component').then(m => m.AlumnosIComponent) },
      { path: 'perfil-instructor', loadComponent: () => import('./instructor/perfil-instructor/perfil-instructor.component').then(m => m.PerfilInstructorComponent) },
      { path: 'taller', loadComponent: () => import('./instructor/taller/taller.component').then(m => m.TallerComponent) },
      { path: 'asistencia', loadComponent: () => import('./instructor/asistencia/asistencia.component').then(m => m.AsistenciaComponent) },
    ],
  },

  // ----- Sección privada: DIRECTOR -----
  {
    path: 'director',
    component: DirectorLayoutComponent,
    canActivate: [directorGuard],
    data: { rol: 'director' },
    children: [
      { path: '', redirectTo: 'gestion', pathMatch: 'full' },
      { path: 'gestion', loadComponent: () => import('./director/gestion/gestion.component').then(m => m.GestionComponent) },
      { path: 'inicio-director', loadComponent: () => import('./incio-director/incio-director.component').then(m => m.IncioDirectorComponent) },
    ],
  },
  {
    path: 'cuenta/cambiar-contrasena',
    loadComponent: () =>
      import('./cuenta/cambiar-contrasena/cambiar-contrasena.component')
        .then(m => m.CambiarContrasenaComponent)
  },

  // Fallback opcional
   { path: '**', redirectTo: 'home' },
];
