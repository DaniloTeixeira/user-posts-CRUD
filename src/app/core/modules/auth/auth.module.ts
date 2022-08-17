import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ComponentsModule } from '../../components/components.module';
import { LoginComponent } from './pages/login';
import { CreateUserComponent } from './pages/create-user';

const components = [AuthComponent, LoginComponent, CreateUserComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ComponentsModule,
    HttpClientModule,

    ReactiveFormsModule,

    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
  ],
  exports: [...components],
})
export class AuthModule {}
