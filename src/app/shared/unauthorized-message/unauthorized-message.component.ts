import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-unauthorized-message',
  templateUrl: 'unauthorized-message.component.html',
  styleUrls: ['unauthorized-message.component.scss']
})
export class UnAuthorizedMessageComponent {
  constructor(private oidcSecurityService: OidcSecurityService) {}
  logout(): void {
    this.oidcSecurityService.logoff();
  }
}
