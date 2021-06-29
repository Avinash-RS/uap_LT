import { createAction, props } from '@ngrx/store';
import { ErrorResponse } from 'src/app/rest-api/common/models/error.model';
import { LoginProfileResponseModel, loginRequest } from './login-model';

export const LOGOUT_ACTION = '[User] Logout Success';
export const DUMMY_ACTION = '[User] Dummy Success';
export const loginAttempt = createAction(
  '[Login MODULE] Login Request',
  props<{ payload: loginRequest }>()
);

export const loginSuccess = createAction(
  '[LOGIN MODULE] On Login success',
  props<{ payload: LoginProfileResponseModel }>()
);

export const loginFailure = createAction(
  '[LOGIN MODULE] On Login failure',
  props<{ payload: any }>()
);

export const logoutAction = createAction(LOGOUT_ACTION);

export const dummyAction = createAction(DUMMY_ACTION);
