// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { LogLevel } from 'angular-auth-oidc-client';

export const environment = {
  production: false,
  API_URL: 'https://uap-api.lntiggnite.com',
  OIDC_CONFIG: {
    issuer: 'https://uap-iam.lntiggnite.com/auth/realms/kodepro',
    clientId: 'uap-ui',
    logging: LogLevel.Error
  },
  TOKEN_URL: 'https://uap-iam.lntiggnite.com/auth/realms/kodepro/protocol/openid-connect/token'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
