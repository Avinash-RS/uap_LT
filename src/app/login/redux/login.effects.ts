import { LoadingService } from 'src/app/rest-api/loading.service';
import { selectUserProfileData } from 'src/app/redux/user/user.reducer';
import { getLoginProfile } from './login.selector';
import { Router } from '@angular/router';
import { AppState } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as LoginActions from './login.actions';
import * as UserActions from '../../redux/user/user.actions';
import { Injectable } from '@angular/core';
import { UserAPIService } from 'src/app/rest-api/user-api/user-api.service';
import { UserProfileResponseModel } from 'src/app/rest-api/user-api/models/user-profile.model';
import { catchError, mergeMap, map, tap } from 'rxjs/operators';
import { ErrorResponse } from 'src/app/rest-api/common/models/error.model';
import { of } from 'rxjs';
import { getReferenceData } from 'src/app/redux/reference-data/reference-data.actions';
import { getUserProfile } from '../../redux/user/user.actions';
// import { getUserProfile } from 'src/app/redux/user/user.selector';

@Injectable()
export class LoginEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.loginAttempt),
      mergeMap((Action) => {        
        this._loading.setLoading(true, 'request.url');
        return this.userAPIService.login(Action.payload).pipe(
          map((data: any) => {
            if (this.userAPIService.isValidUser(data)) {
              return LoginActions.loginSuccess({ payload: data });
            }
            this._loading.setLoading(false, 'request.url');
            return LoginActions.loginFailure({ payload: data });
          }),
          catchError((error: any) => {
            this._loading.setLoading(false, 'request.url');
            return of(LoginActions.loginFailure({ payload: error }));
          })
        )
      }
      )
    )
  }
  );


  constructor(private _loading: LoadingService, private actions$: Actions, private userAPIService: UserAPIService, private store: Store<AppState>, private route: Router) { }

  loginRedirect$ = createEffect(
    ()=> {
      return this.actions$.pipe(
        ofType(LoginActions.loginSuccess),
        tap(async (action: any)=> { 
          await this.store.dispatch(getReferenceData());
          await this.store.dispatch(getUserProfile());
          await this.store.dispatch(UserActions.getUserProfileSuccess({ payload: action.payload }));
         const permsission  = await this.redirectTo();
          if (permsission && permsission == 'ADM') {
            sessionStorage.removeItem('routeTo');
            sessionStorage.removeItem('assessmentId');
            return this.route.navigate(['/admin/assessments'])
          } 
          if (permsission && permsission == 'AST') {
            let getId = sessionStorage.getItem('routeTo');
            let getAssessId = sessionStorage.getItem('assessmentId');
            if (getId) {
              sessionStorage.removeItem('assessmentId');
              return this.route.navigate(['/landing/assessment', getId]);
            }  
            if (getAssessId) {
              sessionStorage.removeItem('routeTo');
              return this.route.navigate(['/landing/assessment', getAssessId]);
            }
            this._loading.setLoading(false, 'request.url');
            return this.route.navigate(['/unauthorized']);
          } else {
            this._loading.setLoading(false, 'request.url');
            return this.route.navigate(['/unauthorized']);
          }
        })
      )
    },
    {dispatch: false}
  )

  userRedirect$ = createEffect(
    ()=> {
      return this.actions$.pipe(
        ofType(LoginActions.dummyAction),
        tap(async (action: any)=> { 
          const permsission  = await this.userredirectTo();
          if (permsission && permsission == 'ADM') {
            sessionStorage.removeItem('routeTo');
            sessionStorage.removeItem('assessmentId');
            return this.route.navigate(['/admin/assessments'])
          } 
          if (permsission && permsission == 'AST') {
            let getId = sessionStorage.getItem('routeTo');
            let getAssessId = sessionStorage.getItem('assessmentId');
            if (getId) {
            sessionStorage.removeItem('assessmentId');
            return this.route.navigate(['/landing/assessment', getId]);
            }  
            if (getAssessId) {
              sessionStorage.removeItem('routeTo');
              return this.route.navigate(['/landing/assessment', getAssessId]);
            }
            this._loading.setLoading(false, 'request.url');
            return this.route.navigate(['/unauthorized']);
            } else {
              this._loading.setLoading(false, 'request.url');
              return this.route.navigate(['/unauthorized']);
          }
        })
      )
    },
    {dispatch: false}
  )

  redirectTo(): any {
    let permission;
    this.store.select(getLoginProfile).subscribe((data: any)=> {
      permission = data.user.data.attributes.organisations[0].roles[0].roleCode;
    });
    return permission;
  }

  userredirectTo(): any {
    let permission;
    this.store.select(selectUserProfileData).subscribe((data: any)=> {
      permission = data.attributes.organisations[0].roles[0].roleCode;
    });
    return permission;
  }

}
