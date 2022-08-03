import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification';
import { FormValidator } from 'src/app/core/utils/form-validators';
import { CreateUserPayload } from '../../interfaces/CreateUserPayload';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['../../auth.component.scss'],
})
export class CreateUserComponent implements OnInit {
  form!: FormGroup;

  hide = true;
  loaded = true;

  destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.notification.success('Usuário criado com sucesso!');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    console.log(this.getCreateUserPayload());
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
      accessType: [null, [Validators.required], ,],
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
}
