import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users = new MatTableDataSource<User>();

  displayedColumns = [
    'id',
    'name',
    'email',
    'accessType',
    'createdAt',
    'actions',
  ];

  constructor() {
    this.users.data = [
      {
        id: 1,
        name: 'Danilo',
        email: 'danilo@teste.com',
        accessType: 'Administrador',
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: 'Mariana',
        email: 'mariana@teste.com',
        accessType: 'Usuário',
        createdAt: new Date().toISOString(),
      },
    ];
  }

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }
}
