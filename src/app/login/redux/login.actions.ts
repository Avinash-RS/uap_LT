import { createAction, props } from '@ngrx/store';
import { ErrorResponse } from 'src/app/rest-api/common/models/error.model';
import { AssessmentIdInterface, LoginProfileResponseModel, loginRequest, loginState } from './login-model';

export const LOGOUT_ACTION = '[LOGIN] Logout Success';
export const DUMMY_ACTION = '[LOGIN] Dummy Success';

export const ASSESSMENTIDPASSING = '[LOGIN] Assessment Id found';
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

export const assessmentIDAction = createAction(ASSESSMENTIDPASSING, props<{id: any}>());