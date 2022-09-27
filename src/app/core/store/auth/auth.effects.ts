import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth';
import { LoaderService } from '../../services/loader';
import { UserService } from '../../services/user';
import {
  showNotificationInfo,
  showNotificationSuccess,
  signInError,
  signInRequest,
  signInSuccess,
  signOnError,
  signOnRequest,
  signOnSuccess,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  signOnRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOnRequest),
      tap(() => this.loader.show('Efetuando cadastro...')),
      switchMap((action) =>
        this.userService.createUser(action.payload).pipe(
          map(() => signOnSuccess()),
          catchError(({ e }) => of(signOnError({ payload: e.error })))
        )
      )
    )
  );

  signOnSuccessNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOnSuccess),
      map(() =>
        showNotificationSuccess({ payload: 'Cadastro efetuado com sucesso!' })
      )
    )
  );

  signOnSuccessRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signOnSuccess),
        tap(() => this.router.navigate(['autenticacao', 'entrar']))
      ),
    { dispatch: false }
  );

  signInRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInRequest),
      tap(() => this.loader.show('Entrando...')),
      switchMap(({ payload }) =>
        this.authService.signIn(payload).pipe(
          map((response) => signInSuccess({ payload: response })),
          catchError(({ e }) => of(signInError({ payload: e.error })))
        )
      ),
      tap(() => this.loader.hide())
    )
  );

  signInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInSuccess),
      map(() => showNotificationSuccess({ payload: 'Seja bem vindo(a)!' }))
    )
  );

  signInSuccessRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signInSuccess),
        tap(() => this.router.navigate(['home']))
      ),
    { dispatch: false }
  );

  signInError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInError),
      map(({ payload }) => showNotificationInfo({ payload }))
    )
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private loader: LoaderService,
    private authService: AuthService,
    private userService: UserService
  ) {}
}
