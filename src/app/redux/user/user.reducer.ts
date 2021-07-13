import { createReducer, on, Action } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { initialState } from './user-reducer.inital.states';
import * as userActions from './user.actions';
import { UserState } from './user.model';

export const userReducer = createReducer(
  initialState,
  on(userActions.getUserProfileSuccess, (state, action) => {
    return {
    ...state,
    user: {
      data: action.payload.data
    }
    }
  }),
  on(userActions.getUserProfileFailure, (state, action) => ({
    ...state,
    user: {
      data: initialState.user.data,
      failureMessage: {
        error: {
          errors: action.payload.error.errors
        }
      }
    }
  }))
);

export function reducer(state: UserState | undefined, action: Action): UserState {
  return userReducer(state, action);
}

export const selectUserProfileData = (state: AppState) => state.user.user.data;
