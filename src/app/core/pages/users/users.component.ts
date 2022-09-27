import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Subject, takeUntil } from 'rxjs';

import { User } from '../../models/User';

import { LoaderService } from '../../services/loader';
import { NotificationService } from '../../services/notification';
import { UserService } from '../../services/user';
import { UsersFormComponent } from './users-form';

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
    private dialog: MatDialog,
    private loader: LoaderService,
    private userService: UserService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  openDialog(user: User): void {
    // TODO -> Validar se é administrador

    const data: any = {
      user: user,
    };

    const dialogRef = this.dialog.open(UsersFormComponent, {
      width: '350px',
      maxHeight: '600px',
      data,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((params) => {
        if (params?.reload) {
          this.getUsers();
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(user: User): void {
    this.loader.show('Apagando usuário...');

    this.userService
      .deleteUser(user.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: () => {
          this.notification.success('Usuário apagado com sucesso!');
          this.getUsers();
        },
        error: () =>
          this.notification.info(
            'Ops... Erro ao apagar usuário. Tente novamente.'
          ),
      })
      .add(() => this.loader.hide());
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
          this.notification.info(
            'Ops... Erro ao buscar usuários, contate o suporte.'
          ),
        complete: () => (this.loading = true),
      })
      .add(() => this.loader.hide());
  }
}
