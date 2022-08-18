import { createAction, props } from '@ngrx/store';
import { Prop } from 'src/app/core/models/Prop';
import { SignInPayload } from '../interfaces/SignInPayload';

export enum AuthActions {
  SignInRequest = '[Auth] Sign In Request',
  SignInSuccess = '[Auth] Sign In Request',
  SignInError = '[Auth] Sign In Request',

  Logout = '[Auth] Logout',

  ClearAuthState = '[Auth] Clear Auth State',
}

export const signInRequest = createAction(
  AuthActions.SignInRequest,
  props<Prop<SignInPayload>>()
);
