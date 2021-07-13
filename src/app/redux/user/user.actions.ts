import { createAction, props } from '@ngrx/store';
import { ErrorResponse } from 'src/app/rest-api/common/models/error.model';
import { UserProfileResponseModel } from 'src/app/rest-api/user-api/models/user-profile.model';

export const getUserProfile = createAction('[USER MODULE] Get user profile');

export const getUserProfileSuccess = createAction(
  '[USER MODULE] Get user profile success',
  props<{ payload: UserProfileResponseModel }>()
);

export const getUserProfileFailure = createAction(
  '[USER MODULE] Get user profile failure',
  props<{ payload: ErrorResponse }>()
);

export const autoLogin = createAction('[user action] Auto login');