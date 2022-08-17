import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification';
import { AccessType } from 'src/app/core/types/AccessType';
import { FormValidator } from 'src/app/core/utils/form-validators';
import { CreateUserPayload } from '../../interfaces/CreateUserPayload';
import { User } from '../../interfaces/User';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['../../auth.component.scss'],
})
export class CreateUserComponent implements OnInit {
  form!: FormGroup;
  user!: User;

  hide = true;
  loading = false;

  destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.createUser();
  }

  toggleShowPass(): void {
    this.hide = !this.hide;
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.minLength(6), Validators.required]],
      confirmPassword: [
        null,
        [
          Validators.minLength(6),
          Validators.required,
          FormValidator.equalsTo('password'),
        ],
      ],
      accessType: [null, Validators.required],
    });
  }

  private getCreateUserPayload(): CreateUserPayload {
    const form = this.form.getRawValue();

    return {
      name: form.name,
      email: form.email,
      password: form.password,
      accessType: form.accessType,
    };
  }

  private getAccessType(): AccessType {
    const accessType = this.form.get('accessType')?.value;

    return accessType === 'admin' ? 'Administrador' : 'Usuário';
  }

  private createUser(): void {
    const accessType = this.getAccessType();
    this.loading = true;

    this.authService
      .createUser(this.getCreateUserPayload())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.notification.success(`${accessType} criado com sucesso!`);
          this.user = response;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }
}
