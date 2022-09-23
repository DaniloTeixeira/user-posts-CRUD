import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';

import { HeaderComponent } from './header';
import { FooterComponent } from './footer';
import { SidenavComponent } from './sidenav';

@NgModule({
  declarations: [SidenavComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, MaterialModule],
  exports: [SidenavComponent, HeaderComponent, FooterComponent],
})
export class SharedModule {}
