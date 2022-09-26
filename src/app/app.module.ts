import { NgModule } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './core/pages/home';
import { NotFoundComponent } from './core/pages/not-found';
import { AuthModule } from './core/modules/auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from './shared/material/material.module';
import { PostsComponent } from './core/pages/posts';
import { UsersComponent } from './core/pages/users';
import { SettingsComponent } from './core/pages/settings/settings.component';
import { ComponentsModule } from './core/components/components.module';
import { UsersFormComponent } from './core/pages/users/users-form/users-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    PostsComponent,
    UsersComponent,
    SettingsComponent,
    UsersFormComponent,
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,

    ToastrModule.forRoot(),
    StoreModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
