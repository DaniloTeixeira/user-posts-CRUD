import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { PostsComponent } from './core/pages/posts';
import { SettingsComponent } from './core/pages/settings';
import { UsersComponent } from './core/pages/users';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inicio',
  },

  {
    path: 'inicio',
    component: HomeComponent,
  },

  {
    path: 'usuarios',
    component: UsersComponent,
  },

  {
    path: 'postagens',
    component: PostsComponent,
  },

  {
    path: 'gerenciar-usuarios',
    component: SettingsComponent,
  },

  {
    path: 'pagina-nao-encontrada',
    component: NotFoundComponent,
  },

  {
    path: 'autenticacao',
    loadChildren: () =>
      import('./core/modules/auth/auth.module').then((m) => m.AuthModule),
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
