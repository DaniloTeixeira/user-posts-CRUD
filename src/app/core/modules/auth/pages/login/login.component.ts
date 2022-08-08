import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../auth.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
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
    console.log(this.getLoginPayload());
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

  private getLoginPayload(): any {
    return this.form.getRawValue();
  }
}
