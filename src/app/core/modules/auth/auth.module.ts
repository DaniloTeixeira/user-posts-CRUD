import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ComponentsModule } from '../../components/components.module';
import { LoginComponent } from './pages/login';
import { CreateUserComponent } from './pages/create-user';
import { MaterialModule } from 'src/app/shared/material/material.module';

const components = [AuthComponent, LoginComponent, CreateUserComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ComponentsModule,
    HttpClientModule,

    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [...components],
})
export class AuthModule {}
