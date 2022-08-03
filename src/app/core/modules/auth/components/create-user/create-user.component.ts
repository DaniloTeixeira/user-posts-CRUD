import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
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

  constructor(private fb: FormBuilder) {}

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
          this.confirmPasswordValidator(),
        ],
      ],
      accessType: [null, [Validators.required]],
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

  private confirmPasswordValidator(): Validators {
    return (confirmPasswordControl: FormGroup) => {
      const confirmPasswordValue = confirmPasswordControl.value;
      const passwordValue = this.form?.get('password')?.value;

      if (!passwordValue) {
        return null;
      }
      return confirmPasswordValue === passwordValue
        ? null
        : { differentPass: true };
    };
  }
}
