import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, authFeatureKey } from './auth.reducer';

export const selectAuthState = createFeatureSelector<State>(authFeatureKey);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state) => state.authUser
);
