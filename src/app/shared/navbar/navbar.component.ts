import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavBarComponent {
  constructor(private oidcSecurityService: OidcSecurityService, private router: Router) {}

  logout(): void {
    this.oidcSecurityService.logoff(this.postLogOut);
  }

  navigateToProfile(): void {
    this.router.navigateByUrl('/profile');
  }

  postLogOut(url:string) {
    window.location.assign(`${url}&post_logout_redirect_uri=${window.location.href}`);
  }
}
