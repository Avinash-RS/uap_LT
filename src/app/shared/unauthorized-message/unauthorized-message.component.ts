import { LoadingService } from './../../rest-api/loading.service';
import * as loginAction from './../../login/redux/login.actions';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { UserAPIService } from 'src/app/rest-api/user-api/user-api.service';
import { Component } from '@angular/core';
// import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-unauthorized-message',
  templateUrl: 'unauthorized-message.component.html',
  styleUrls: ['unauthorized-message.component.scss']
})
export class UnAuthorizedMessageComponent {
  constructor(private userService: UserAPIService, private store: Store<AppState>, private _loading: LoadingService) {
    this._loading.setLoading(false, 'request.url');
  }
  logout(): void {
    // this.store.dispatch(loginAction.logoutAction());
    this.userService.logout();
    // this.oidcSecurityService.logoff();
  }
}
