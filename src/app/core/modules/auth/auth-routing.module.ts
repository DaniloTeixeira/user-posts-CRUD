import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { CreateUserComponent } from './components/create-user';
import { LoginComponent } from './components/login';

const routes: Routes = [
  {
    path: 'autenticacao',
    pathMatch: 'full',
    redirectTo: 'autenticacao/entrar',
  },
  {
    path: 'autenticacao',
    component: AuthComponent,
    children: [
      { path: 'entrar', component: LoginComponent },
      { path: 'cadastrar', component: CreateUserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
