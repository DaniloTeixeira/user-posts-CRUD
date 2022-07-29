import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav';
import { HeaderComponent } from './header';
import { FooterComponent } from './footer';

@NgModule({
  declarations: [SidenavComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule],
  exports: [SidenavComponent, HeaderComponent, FooterComponent],
})
export class SharedModule {}
