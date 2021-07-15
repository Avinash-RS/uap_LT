import { LoadingService } from './../../rest-api/loading.service';
import { dummyAction } from './../../login/redux/login.actions';
import { Router } from '@angular/router';
import { AppState } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { Injectable } from '@angular/core';
import { UserAPIService } from 'src/app/rest-api/user-api/user-api.service';
import { UserProfileResponseModel } from 'src/app/rest-api/user-api/models/user-profile.model';
import { catchError, mergeMap, map, tap } from 'rxjs/operators';
import { ErrorResponse } from 'src/app/rest-api/common/models/error.model';
import { of } from 'rxjs';
import { getUserProfile } from './user.selector';

@Injectable()
export class UserEffects {


  getUserProfile$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.getUserProfile),
        mergeMap((action) => {
        this._loading.setLoading(true, 'request.url');
        return this.userAPIService.getUserProfile().pipe(
          map((user: UserProfileResponseModel) => {
            return UserActions.getUserProfileSuccess({ payload: user })
          }),
          catchError((error: ErrorResponse) => {
            this._loading.setLoading(false, 'request.url');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            this.router.navigate(['/unauthorized']);
            return of(UserActions.getUserProfileFailure({ payload: error }))
          })
        )
        })
      )  
    });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.autoLogin),
      mergeMap((action) => {
        const user = this.userAPIService.getUserFromLocalStorage();
        let users = {
          data: user
        }
        if (user) {
          return of(UserActions.getUserProfileSuccess({ payload: users }));
        } else {
          return of(dummyAction);
        }
      })
    );
  });

  constructor(private _loading: LoadingService, private router: Router, private actions$: Actions, private userAPIService: UserAPIService, private store: Store<AppState>, private route: Router) { }

}
