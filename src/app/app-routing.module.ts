import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { LoginComponent } from './core/pages/login/login.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'entrar',
  },
  {
    path: 'inicio',
    component: HomeComponent,
  },
  {
    path: 'entrar',
    component: LoginComponent,
  },
  {
    path: 'pagina-nao-encontrada',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'pagina-nao-encontrada',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
