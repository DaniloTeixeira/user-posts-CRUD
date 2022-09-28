import { createAction, props } from '@ngrx/store';
import { Prop } from '../../interfaces/Prop';

export enum NotificationActions {
  ShowNotificationSuccess = '[Auth] Show Notification Success',
  ShowNotificationInfo = '[Auth] Show Notification Info',
  ShowNotificationConfirm = '[Auth] Show Notification Confirm',
}

export const showNotificationSuccess = createAction(
  NotificationActions.ShowNotificationSuccess,
  props<Prop<string>>()
);

export const showNotificationInfo = createAction(
  NotificationActions.ShowNotificationInfo,
  props<Prop<string>>()
);

export const showNotificationConfirm = createAction(
  NotificationActions.ShowNotificationConfirm,
  props<Prop<string>>()
);
