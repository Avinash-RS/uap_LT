import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './custom-route-serializer';
import { userReducer } from '../redux/user/user.reducer';
import { UserState } from '../redux/user/user.model';
import { ReferenceState } from '../redux/reference-data/reference-data.model';
import { referenceReducer } from '../redux/reference-data/reference-data.reducer';

const modules: any = {
  router: routerReducer,
  user: userReducer
};

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
  user: UserState;
  reference: ReferenceState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  user: userReducer,
  reference: referenceReducer
};

export function resetOnLogout(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    let newState: any;
    if (action.type === '[User] Logout Success') {
      newState = Object.assign({}, state);
      Object.keys(modules).forEach((key) => {
        newState[key] = modules[key].initialState;
      });
    }
    return reducer(newState || state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [resetOnLogout]
  : [resetOnLogout];
