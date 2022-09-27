import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Post } from 'src/app/core/interfaces/Post';
import { LoaderService } from 'src/app/core/services/loader';
import { NotificationService } from 'src/app/core/services/notification';
import { PostService } from 'src/app/core/services/post';
import { UserService } from 'src/app/core/services/user';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  form?: FormGroup<{
    content: FormControl<string>;
  }>;

  post?: Post;

  destroyed$ = new Subject<void>();

  mode: 'publish' | 'edit' = 'publish';

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<number>,
    private fb: NonNullableFormBuilder,
    private loader: LoaderService,
    private postService: PostService,
    private notification: NotificationService
  ) {
    this.post = data.post;
    this.mode = data.post ? 'edit' : 'publish';
  }

  get title(): string {
    return this.mode === 'publish' ? 'Publicar' : 'Editar';
  }

  ngOnInit(): void {
    this.buildForm();

    if (this.mode === 'edit') {
      this.fillform();
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSubmit(): void {
    if (this.form?.invalid) {
      return;
    }

    if (this.mode === 'edit') {
      this.editPost();
      return;
    }

    this.createPost();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      content: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  private noDataChanged(post: any): boolean {
    return post.content === this.post!.content;
  }

  private fillform(): void {
    this.form?.patchValue({
      content: this.post!.content,
    });
  }

  createPost(): void {
    const id = 1; // TODO -> Pegar o id do usuário logado
    const payload = this.form!.value as string;

    this.loader.show('Publicando postagem...');

    this.postService
      .createPost(id, payload)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: () => {
          this.notification.success('Postagem publicada com sucesso!');

          this.dialogRef.close({
            reload: true,
          });
        },
        error: () =>
          this.notification.info(
            'Ops... Erro ao publicar postagem. Tente novamente.'
          ),
      })
      .add(() => this.loader.hide());
  }

  private editPost(): void {
    const id = this.post!.id;
    const payload = this.form!.value as string;

    if (this.noDataChanged(payload)) {
      this.notification.info('Altere alguma informação para continuar');
      return;
    }

    this.loader.show('Alterando dados da postagem...');

    this.postService
      .editPost(id, payload)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: () => {
          this.notification.success('Postagem alterada com sucesso!');

          this.dialogRef.close({
            reload: true,
          });
        },
        error: () => {
          this.notification.info(
            'Ops... Erro ao atualizar postagem. Tente novamente.'
          );
        },
      })
      .add(() => this.loader.hide());
  }
}
