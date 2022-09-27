import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader';
import { NotificationService } from 'src/app/core/services/notification';
import { SignInResponse } from '../../interfaces/SignInResponse';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../auth.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  hide = true;
  loaded = true;
  loggedUser?: SignInResponse;

  destroyed$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private loader: LoaderService,
    private notification: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.notification.info('Preencha o e-mail e senha para continuar.');
      return;
    }

    this.signIn();
  }

  toggleShowPass(): void {
    this.hide = !this.hide;
  }

  private buildForm(): void {
    this.form = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.minLength(6), Validators.required]],
    });
  }

  private getSignInPayload(): any {
    return this.form.getRawValue();
  }

  private signIn(): void {
    const payload = this.getSignInPayload();

    this.loader.show('Entrando...');

    this.authService
      .signIn(payload)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (userInfo) => {
          this.loggedUser = userInfo;
          this.notification.success('Login efetuado com sucesso!');
        },
        error: ({ error }) => this.notification.info(error.error),
      })
      .add(() => this.loader.hide());
  }
}
