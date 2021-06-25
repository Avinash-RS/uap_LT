import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserAPIService } from './rest-api/user-api/user-api.service';
import { catchError, map } from 'rxjs/operators';
import { UserProfileResponseModel } from './rest-api/user-api/models/user-profile.model';
import { getUserProfile } from './redux/user/user.actions';
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

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    if (true
      // this.oidcSecurityService.getToken() &&
      // !this.tokenValidationService.hasIdTokenExpired(
      //   this.oidcSecurityService.getToken(),
      //   this.oidcSecurityService.configuration.configuration.renewTimeBeforeTokenExpiresInSeconds
      // )
    ) {
      this.store.dispatch(getReferenceData());
      this.store.dispatch(getUserProfile());
      return this.userAPIService.getUserProfile().pipe(
        map((userProfile: UserProfileResponseModel) => {
          return true;
        }),
        catchError((error) => of(false))
      );
    } else {
      return false;
    }
  }
}
