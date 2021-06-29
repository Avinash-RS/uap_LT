import { dummyAction } from './login/redux/login.actions';
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

@Injectable()
export class PrivilegeAutoLogoutGuard implements CanActivate {
  constructor(
    private router: Router,
    private userAPIService: UserAPIService,
    private store: Store<AppState>
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    let token = localStorage.getItem('token');
    if (!token) {
        return true;
    } else {
        this.store.dispatch(dummyAction());
        return false;
    }
  }
}
