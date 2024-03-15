import { SignInResponse } from '../../modules/auth/interfaces/SignInResponse';

export interface AuthState {
  loggedUserInfo?: SignInResponse;
}
