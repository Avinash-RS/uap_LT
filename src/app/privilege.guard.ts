import { LoadingService } from './rest-api/loading.service';
import { loginSuccess } from './login/redux/login.actions';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserAPIService } from './rest-api/user-api/user-api.service';
import { catchError, map } from 'rxjs/operators';
import { UserProfileResponseModel } from './rest-api/user-api/models/user-profile.model';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';

@Injectable()
export class PrivilegeGuard implements CanActivate {
  constructor(
    private router: Router,
    private userAPIService: UserAPIService,
    private _loading: LoadingService,
    private store: Store<AppState>
  ) {}

  canActivate(route: any): Observable<boolean> | boolean {
    let token = sessionStorage.getItem('token');
      let param = route.queryParams;
      if (param && param.token) {
        if (param.appType && param.appType == '1') {
          sessionStorage.setItem('fromCert', 'true')          
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
        sessionStorage.setItem('routeTo', id);
        this.loginApi(param.token);
        return false;  
      }
    if (token) {
    this._loading.setLoading(true, 'request.url');
    return this.userAPIService.getUserProfile().pipe(
        map((userProfile: UserProfileResponseModel) => {
          return true;
        }),
        catchError((error) => {
          this._loading.setLoading(false, 'request.url');
          this.router.navigate(['/unauthorized']);
          return of(false)
        })
      );
    } else {
      this.userAPIService.logout();
      return false;
    }
  }

  loginApi(data: any) {
    let apiData = {
      email: data,
      assessmentId: sessionStorage.getItem('assessmentId') || sessionStorage.getItem('routeTo')
    }
    let responseData;
    this._loading.setLoading(true, 'request.url');
    this.userAPIService.getTokenFromParamForLogin(apiData).subscribe((res: any) => {
      if (res && res.data && res.data && res.data.token) {
        // console.log('res',res)
        responseData = {
          data: res.data,
          token: res.data.token
        }
        this.userAPIService.isValidUser(responseData);
        this.store.dispatch(loginSuccess({ payload: responseData }));
      } else {
        // console.log('else',res)
        this._loading.setLoading(false, 'request.url');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        this.router.navigate(['/unauthorized']);
      }
    }, (err) => {
      this._loading.setLoading(false, 'request.url');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      this.router.navigate(['/unauthorized']);
    })
  }
}
