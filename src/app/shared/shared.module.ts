import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';

import { HeaderComponent } from './header';
import { FooterComponent } from './footer';
import { SidenavComponent } from './sidenav';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../core/components/components.module';

@NgModule({
  declarations: [SidenavComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, MaterialModule, RouterModule, ComponentsModule],
  exports: [SidenavComponent, HeaderComponent, FooterComponent],
})
export class SharedModule {}
