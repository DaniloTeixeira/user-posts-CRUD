import { createAction, props } from '@ngrx/store';
import { Prop } from 'src/app/core/interfaces/Prop';
import { SignOnPayload } from '../../interfaces/SignOnPayload';
import { SignInResponse } from '../../modules/auth/interfaces/SignInResponse';

export enum AuthActions {
  SignOnRequest = '[Auth] sign On Request',
  SignOnSuccess = '[Auth] sign On Success',
  SignOnError = '[Auth] sign On Error',

  SignInRequest = '[Auth] Sign In Request',
  SignInSuccess = '[Auth] Sign In Success',
  SignInError = '[Auth] Sign In Error',

  SignOut = '[Auth] Logout',

  ClearAuthState = '[Auth] Clear Auth State',

  ShowNotificationSuccess = '[Auth] Show Notification Success',
  ShowNotificationInfo = '[Auth] Show Notification Info',
  ShowNotificationConfirm = '[Auth] Show Notification Confirm',
}

export const signOnRequest = createAction(
  AuthActions.SignOnRequest,
  props<Prop<SignOnPayload>>()
);

export const signOnSuccess = createAction(AuthActions.SignOnSuccess);

export const signOnError = createAction(
  AuthActions.SignOnError,
  props<Prop<string>>()
);

export const signInRequest = createAction(
  AuthActions.SignInRequest,
  props<Prop<SignOnPayload>>()
);

export const signInSuccess = createAction(
  AuthActions.SignInSuccess,
  props<Prop<SignInResponse>>()
);

export const signInError = createAction(
  AuthActions.SignInError,
  props<Prop<string>>()
);

export const signOut = createAction(AuthActions.SignOut);

export const clearAuthState = createAction(AuthActions.ClearAuthState);

export const showNotificationSuccess = createAction(
  AuthActions.ShowNotificationSuccess,
  props<Prop<string>>()
);

export const showNotificationInfo = createAction(
  AuthActions.ShowNotificationInfo,
  props<Prop<string>>()
);

export const showNotificationConfirm = createAction(
  AuthActions.ShowNotificationConfirm,
  props<Prop<string>>()
);
