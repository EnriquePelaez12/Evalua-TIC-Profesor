import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NologinGuard } from './guards/nologin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './componetes/login/login.module#LoginPageModule', canActivate: [NologinGuard]},
  { path: 'registro/:id', loadChildren: './componetes/registro/registro.module#RegistroPageModule' },
  { path: 'registro', loadChildren: './componetes/registro/registro.module#RegistroPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' },
  { path: 'preguntas', loadChildren: './componetes/pages/preguntas/preguntas.module#PreguntasPageModule' },
  { path: 'details-preguntas/:id', loadChildren: './componetes/pages/details-preguntas/details-preguntas.module#DetailsPreguntasPageModule' },
  { path: 'details-preguntas', loadChildren: './componetes/pages/details-preguntas/details-preguntas.module#DetailsPreguntasPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
