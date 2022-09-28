import { NgModule } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './core/modules/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from './core/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material/material.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HomeComponent } from './core/pages/home';
import { NotFoundComponent } from './core/pages/not-found';
import { PostsComponent } from './core/pages/posts';
import { UsersComponent } from './core/pages/users';
import { SettingsComponent } from './core/pages/settings/settings.component';
import { UsersFormComponent } from './core/pages/users/users-form';
import { PostFormComponent } from './core/pages/posts/post-form';
import { metaReducers } from './core/store/meta-reducers';
import { authReducer } from './core/store/auth/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './core/store/auth/auth.effects';
import { NotificationEffects } from './core/store/notification/notification.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    PostsComponent,
    UsersComponent,
    SettingsComponent,
    UsersFormComponent,
    PostFormComponent,
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

    StoreModule.forRoot({ auth: authReducer }, { metaReducers }),
    EffectsModule.forRoot([AuthEffects, NotificationEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
