import { createReducer, on } from '@ngrx/store';
import { Prop } from 'src/app/core/interfaces/Prop';
import { SignInResponse } from '../../modules/auth/interfaces/SignInResponse';
import { clearAuthState, signInSuccess, signOut } from './auth.actions';
import { AuthState } from './auth.interfaces';

const initialState: AuthState = {};

const _signInSuccess = (
  state: AuthState,
  action: Prop<SignInResponse>
): AuthState => ({
  ...state,
  loggedUserInfo: action.payload,
});

const _signOut = (state: AuthState): AuthState => ({
  ...state,
  loggedUserInfo: undefined,
});

const _clearAuthState = (): AuthState => ({});

export const authReducer = createReducer(
  initialState,
  on(signInSuccess, _signInSuccess),
  on(signOut, _signOut),
  on(clearAuthState, _clearAuthState)
);
