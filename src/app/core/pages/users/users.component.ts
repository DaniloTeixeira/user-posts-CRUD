import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Subject, takeUntil } from 'rxjs';

import { User } from '../../models/User';

import { LoaderService } from '../../services/loader';
import { NotificationService } from '../../services/notification';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users = new MatTableDataSource<User>();

  displayedColumns = [
    'id',
    'name',
    'email',
    'accessType',
    'createdAt',
    'actions',
  ];

  destroyed$ = new Subject<void>();

  loading = false;

  constructor(
    private userService: UserService,
    private loader: LoaderService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  private getUsers(): void {
    this.loader.show('Buscando usuários...');

    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (users) => {
          this.users.data = users;
        },
        error: () =>
          this.notification.warning(
            'Ops... Erro ao buscar usuários, contate o suporte.'
          ),
        complete: () => (this.loading = true),
      })
      .add(() => this.loader.hide());
  }
}
