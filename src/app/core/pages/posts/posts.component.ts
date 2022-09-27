import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { CreateOrEditPostPayload } from '../../models/CreateOrEditPostPayload';
import { Post } from '../../models/Post';
import { User } from '../../models/User';
import { LoaderService } from '../../services/loader';
import { NotificationService } from '../../services/notification';
import { PostService } from '../../services/post';
import { UserService } from '../../services/user';
import { PostFormComponent } from './post-form/post-form.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts = new MatTableDataSource<Post>();

  displayedColumns = ['id', 'content', 'user', 'createdAt', 'actions'];

  destroyed$ = new Subject<void>();

  loading = false;

  constructor(
    private dialog: MatDialog,
    private loader: LoaderService,
    private userService: UserService,
    private postService: PostService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.getPosts();
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
          this.getPosts();
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.posts.filter = filterValue.trim().toLowerCase();
  }

  createPost(id: number, content: CreateOrEditPostPayload): void {
    this.loader.show('Publicando postagem...');

    this.postService
      .createPost(id, content)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (response) => this.notification.success(response),
        error: () =>
          this.notification.info(
            'Ops... Erro ao criar postagem. Tente novamente.'
          ),
      })
      .add(() => this.loader.hide());
  }

  deletePost(post: Post): void {
    this.loader.show('Apagando postagem...');

    this.postService
      .deletePost(post.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (response) => {
          this.notification.success(response);
          this.getPosts();
        },
        error: () =>
          this.notification.info(
            'Ops... Erro ao apagar postagem. Tente novamente.'
          ),
      })
      .add(() => this.loader.hide());
  }

  private getPosts(): void {
    this.loader.show('Buscando postagens...');

    this.postService
      .getPosts()
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
