import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { CreateOrEditPostPayload } from 'src/app/core/models/CreateOrEditPostPayload';
import { Post } from 'src/app/core/models/Post';
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
    content: FormControl<string | null>;
  }>;

  post!: Post;

  destroyed$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<number>,
    private fb: FormBuilder,
    private loader: LoaderService,
    private postService: PostService,
    private notification: NotificationService
  ) {
    this.post = data.post;
  }

  ngOnInit(): void {
    this.buildForm();
    this.fillform();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSubmit(): void {
    if (this.form?.invalid) {
      return;
    }

    this.editPost();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      content: this.fb.control('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  private noDataChanged(post: any): boolean {
    return post.content === this.post.content;
  }

  private fillform(): void {
    this.form?.patchValue({
      content: this.post.content,
    });
  }

  private getEditPostPayload(): CreateOrEditPostPayload {
    const form = this.form?.getRawValue();

    return {
      content: form!.content!.trim(),
    };
  }

  private editPost(): void {
    const id = this.post.id;
    const payload = this.getEditPostPayload();
    const noDataChanged = this.noDataChanged(payload);

    if (noDataChanged) {
      this.notification.info('Altere algum dado para prosseguir.');
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
