import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppModuleEnum } from './app.enums';
import { Observable, of } from 'rxjs';
import { UserAPIService } from './rest-api/user-api/user-api.service';
import { catchError, map } from 'rxjs/operators';
import { UserProfileResponseModel } from './rest-api/user-api/models/user-profile.model';
import { OidcSecurityService, TokenValidationService } from 'angular-auth-oidc-client';
import { getUserProfile } from './redux/user/user.actions';
import { getReferenceData } from './redux/reference-data/reference-data.actions';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';

@Injectable()
export class PrivilegeGuard implements CanActivate {
  constructor(
    private router: Router,
    private userAPIService: UserAPIService,
    private oidcSecurityService: OidcSecurityService,
    private tokenValidationService: TokenValidationService,
    private store: Store<AppState>
  ) {}

  canActivate(): Observable<boolean> | boolean {
    if (
      this.oidcSecurityService.getToken() &&
      !this.tokenValidationService.hasIdTokenExpired(
        this.oidcSecurityService.getToken(),
        this.oidcSecurityService.configuration.configuration.renewTimeBeforeTokenExpiresInSeconds
      )
    ) {
      this.store.dispatch(getReferenceData());
      this.store.dispatch(getUserProfile());
      return this.userAPIService.getUserProfile().pipe(
        map((userProfile: UserProfileResponseModel) => {
          if (
            AppModuleEnum.AssessmentTaker ===
            userProfile?.data.attributes.organisations[0].roles[0].roleCode
          ) {
            this.router.navigate(['/unauthorized']);
            return false;
          }
          return true;
        }),
        catchError((error) => of(false))
      );
    } else {
      return false;
    }
  }
}
