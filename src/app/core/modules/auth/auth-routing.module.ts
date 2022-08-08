import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { CreateUserComponent } from './pages/create-user';
import { LoginComponent } from './pages/login';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'entrar',
  },
  {
    path: '',
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
