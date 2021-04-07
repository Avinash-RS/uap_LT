import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { Injectable } from '@angular/core';
import { UserAPIService } from 'src/app/rest-api/user-api/user-api.service';
import { UserProfileResponseModel } from 'src/app/rest-api/user-api/models/user-profile.model';
import { catchError, mergeMap } from 'rxjs/operators';
import { ErrorResponse } from 'src/app/rest-api/common/models/error.model';

@Injectable()
export class UserEffects {
  getUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUserProfile),
      mergeMap(() =>
        this.userAPIService.getUserProfile().pipe(
          mergeMap((user: UserProfileResponseModel) => [
            UserActions.getUserProfileSuccess({ payload: user })
          ]),
          catchError((error: ErrorResponse) => [
            UserActions.getUserProfileFailure({ payload: error })
          ])
        )
      )
    )
  );

  constructor(private actions$: Actions, private userAPIService: UserAPIService) {}
}
