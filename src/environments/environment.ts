// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// import { LogLevel } from 'angular-auth-oidc-client';

export const environment = {
  production: false,
  staging: false,
  qa: false,
  dev: false,
  local: true,
  encryptionKey: 'unifiedReports',
  ADFBASEURL: 'https://uap-uat.azurewebsites.net',
  MICROCERTREDIRECT: 'https://certification.lntiggnite.com/myAssessment',
  API_URL: 'https://uapdev-api.lntiggnite.com',
  NODE_URL: 'https://uapedgeservicedev.lntedutech.com',
  UNIFIED_REPORT : 'https://unifiedreport-dev.lntedutech.com/auth/reports/viewreport/'
  // VideoAssementToken: 'https://uapcoreservice.lntedutech.com'
//   OIDC_CONFIG: {
//     issuer: 'https://uap-iam.lntiggnite.com/auth/realms/uap',
//     clientId: 'uap-ui',
//     logging: LogLevel.Error
//   },
//   TOKEN_URL: 'https://uap-iam.lntiggnite.com/auth/realms/uap/protocol/openid-connect/token'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
