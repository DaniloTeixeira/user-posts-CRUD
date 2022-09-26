import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Post } from '../../models/Post';
import { LoaderService } from '../../services/loader';
import { NotificationService } from '../../services/notification';
import { UserService } from '../../services/user';
import { PostFormComponent } from './post-form/post-form.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts = new MatTableDataSource<Post>();

  displayedColumns = ['id', 'content', 'user', 'actions'];

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

  openDialog(post: Post): void {
    // TODO -> Validar se é administrador

    const data: any = {
      post: post,
    };

    const dialogRef = this.dialog.open(PostFormComponent, {
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

  deleteUser(post: Post): void {
    this.loader.show('Apagando postagem...');

    this.userService
      .deleteUser(post.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: () => {
          this.notification.success('Postagem apagada com sucesso!');
          this.getUsers();
        },
        error: () =>
          this.notification.info(
            'Ops... Erro ao apagar postagem. Tente novamente.'
          ),
      })
      .add(() => this.loader.hide());
  }

  private getUsers(): void {
    this.loader.show('Buscando postagens...');

    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (posts) => {
          this.posts.data = posts;
        },
        error: () =>
          this.notification.info(
            'Ops... Erro ao buscar postagens, contate o suporte.'
          ),
        complete: () => (this.loading = true),
      })
      .add(() => this.loader.hide());
  }
}
