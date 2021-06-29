// import { APP_INITIALIZER, NgModule } from '@angular/core';
// import { AuthModule, OidcConfigService } from 'angular-auth-oidc-client';
// import { environment } from 'src/environments/environment';

// export function configureAuth(oidcConfigService: OidcConfigService) {
//   return () =>
//     oidcConfigService.withConfig({
//       stsServer: environment.OIDC_CONFIG.issuer,
//       redirectUrl: window.location.origin,
//       postLogoutRedirectUri: undefined,
//       clientId: environment.OIDC_CONFIG.clientId,
//       scope: 'openid profile email',
//       responseType: 'code',
//       triggerAuthorizationResultEvent: true,
//       silentRenew: true,
//       silentRenewUrl: window.location.origin + '/static/oidc/silent-renew.html',
//       tokenRefreshInSeconds: 60,
//       renewTimeBeforeTokenExpiresInSeconds: 120,
//       historyCleanupOff: true,
//       logLevel: environment.OIDC_CONFIG.logging
//     });
// }

// @NgModule({
//   imports: [AuthModule.forRoot()],
//   providers: [
//     OidcConfigService,
//     {
//       provide: APP_INITIALIZER,
//       useFactory: configureAuth,
//       deps: [OidcConfigService],
//       multi: true,
//     },
//   ],
//   exports: [AuthModule],
// })
// export class AuthConfigModule {}
