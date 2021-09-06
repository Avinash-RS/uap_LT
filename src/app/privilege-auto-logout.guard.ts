import { dummyAction, loginSuccess } from './login/redux/login.actions';
import { logoutAction } from 'src/app/login/redux/login.actions';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserAPIService } from './rest-api/user-api/user-api.service';
import { catchError, map } from 'rxjs/operators';
import { UserProfileResponseModel } from './rest-api/user-api/models/user-profile.model';
import { getUserProfile, autoLogin } from './redux/user/user.actions';
import { getReferenceData } from './redux/reference-data/reference-data.actions';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';
import { LoadingService } from './rest-api/loading.service';

@Injectable()
export class PrivilegeAutoLogoutGuard implements CanActivate {
  constructor(
    private router: Router,
    private userAPIService: UserAPIService,
    private _loading: LoadingService,
    private store: Store<AppState>

  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    let param = route.queryParams;
    const userProfile = JSON.parse(sessionStorage.getItem('user'));
    let email = userProfile && userProfile.attributes && userProfile.attributes.email ? userProfile.attributes.email : null;
    if (param && param.coding) {
      if (email) {
        // this.loginApi(email);
      }
    }
    let token = sessionStorage.getItem('token');
    if (!token) {
        return true;
    } else {
        this.store.dispatch(dummyAction());
        return false;
    }
  }

  loginApi(data: any) {
    let apiData = {
      email: data
    }
    let responseData;
    this._loading.setLoading(true, 'request.url');
    this.userAPIService.getTokenFromParamForLogin(apiData).subscribe((res: any) => {
      if (res && res.data && res.data.data && res.data.token) {
        responseData = {
          data: res.data.data,
          token: res.data.token
        }
        this.userAPIService.isValidUser(responseData);
        this.store.dispatch(loginSuccess({ payload: responseData }));
      } else {
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
