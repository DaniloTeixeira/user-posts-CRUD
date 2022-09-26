import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  form?: FormGroup<{
    name: FormControl<string | null>;
    email: FormControl<string | null>;
  }>;

  user!: User;

  destroyed$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<number>,
    private fb: FormBuilder,
    private loader: LoaderService,
    private userService: UserService,
    private notification: NotificationService
  ) {
    this.user = data.user;
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

    this.editUser();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
    });
  }

  private noDataChanged(user: any): boolean {
    return user.name === this.user.name && user.email === this.user.email;
  }

  private fillform(): void {
    this.form?.patchValue({
      name: this.user.name,
      email: this.user.email,
    });
  }

  private getEditUserPayload(): EditUserPayload {
    const form = this.form?.getRawValue();

    return {
      name: form!.name!.trim(),
      email: form!.email!.trim(),
    };
  }

  private editUser(): void {
    const id = this.user.id;
    const payload = this.getEditUserPayload();
    const noDataChanged = this.noDataChanged(payload);

    if (noDataChanged) {
      this.notification.info('Altere algum dado para prosseguir.');
      return;
    }

    this.loader.show('Alterando dados do usuário...');

    this.userService
      .editUser(id, payload)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: () => {
          this.notification.success('Usuário alterado com sucesso!');

          this.dialogRef.close({
            reload: true,
          });
        },
        error: () =>
          this.notification.info(
            'Ops... Erro ao atualizar usuário. Tente novamente.'
          ),
      })
      .add(() => this.loader.hide());
  }
}
