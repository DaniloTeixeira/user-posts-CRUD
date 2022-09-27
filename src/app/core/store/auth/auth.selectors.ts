import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.interfaces';

const selectFeature = createFeatureSelector<AuthState>('auth');

export const selectAuth = createSelector(selectFeature, (state) => state);

export const selectLoggedUser = createSelector(
  selectFeature,
  (state) => state.loggedUserInfo
);

export const selectHasToken = createSelector(
  selectFeature,
  (state) => !!state.loggedUserInfo?.token
);
