import { logoutAction, loginSuccess } from './login/redux/login.actions';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserAPIService } from './rest-api/user-api/user-api.service';
import { catchError, map } from 'rxjs/operators';
import { UserProfileResponseModel } from './rest-api/user-api/models/user-profile.model';
import { getUserProfile, autoLogin } from './redux/user/user.actions';
import { getReferenceData } from './redux/reference-data/reference-data.actions';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';

@Injectable()
export class PrivilegeGuard implements CanActivate {
  constructor(
    private router: Router,
    private userAPIService: UserAPIService,
    private store: Store<AppState>
  ) {}

  canActivate(route: any): Observable<boolean> | boolean {
    let token = localStorage.getItem('token');
    // localStorage.removeItem('routeTo');
    if (!token) {
      let param = route.queryParams;
      if (param && param.token) {
        // this.router.navigate(['/login'])
        if (param.appType && param.appType == '1') {
          localStorage.setItem('fromCert', 'true')          
        }
        let segments = route['_urlSegment']['segments'];
        let loop: any;
        const findI = segments.find((x: any, i: any) => {        
          if (x.path == 'assessment') {
            loop = i + 1;
            return i;
          }
        });
        let id = segments[loop].path
        localStorage.setItem('routeTo', id);
        this.loginApi(param.token);
        return false;  
      }
    }
    if (token) {
      // this.store.dispatch(autoLogin());
    //  this.store.dispatch(getReferenceData());
    //  this.store.dispatch(getUserProfile());
    return this.userAPIService.getUserProfile().pipe(
        map((userProfile: UserProfileResponseModel) => {
          return true;
        }),
        catchError((error) => {
          return of(false)
        })
      );
    } else {
      // this.store.dispatch(logoutAction());
      this.userAPIService.logout();
      return false;
    }
  }

  loginApi(data: any) {
    let apiData = {
      email: data
    }
    let responseData;
    this.userAPIService.getTokenFromParamForLogin(apiData).subscribe((res: any) => {
      if (res && res.data && res.data.data && res.data.token) {
        responseData = {
          data: res.data.data,
          token: res.data.token
        }
        this.userAPIService.isValidUser(responseData);
        this.store.dispatch(loginSuccess({ payload: responseData }));
      } else {
        this.router.navigate(['/unauthorized']);
      }
    }, (err) => {
      this.router.navigate(['/unauthorized']);
    })
  }
}
