import { createReducer, on, Action } from '@ngrx/store';
import { loginState } from './login-model';
import { initialState } from './login-reducer.inital.states';
import * as loginActions from './login.actions';

export const loginReducer = createReducer(
  initialState,
  on(loginActions.loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.payload
    }
  }),
  on(loginActions.logoutAction, (state, action)=> {
    return {
      ...state
    }
  }),
  on(loginActions.assessmentIDAction, (state, action)=> {
    return {
      ...state,
      assessmentId: action && action.id && action.id ? action.id : null
    }
  })
);

export function reducer(state: loginState | undefined, action: Action): loginState {
  return loginReducer(state, action);
}

