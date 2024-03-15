import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { tap } from 'rxjs';
import { NotificationService } from '../../services/notification';
import { NotificationActions } from './notification.actions';

@Injectable()
export class NotificationEffects {
  showNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          NotificationActions.ShowNotificationSuccess,
          NotificationActions.ShowNotificationInfo,
          NotificationActions.ShowNotificationConfirm
        ),
        tap((action: Action & { payload: string }) => {
          switch (action.type) {
            case NotificationActions.ShowNotificationSuccess:
              this.notification.success(action.payload);
              break;
            case NotificationActions.ShowNotificationInfo:
              this.notification.info(action.payload);
              break;
            // case NotificationActions.ShowNotificationConfirm:
            //   this.notification.confirm(action.payload);
            //   break;
          }
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private notification: NotificationService
  ) {}
}
