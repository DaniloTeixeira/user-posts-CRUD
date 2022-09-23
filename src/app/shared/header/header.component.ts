import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onTabChange(event: MatTabChangeEvent) {
    const tabIndex = event.index;

    const routes: { [key: number]: string } = {
      0: '/inicio',
      1: '/usuarios',
      2: '/postagens',
    };

    return this.router.navigate([routes[tabIndex]]);
  }
}
