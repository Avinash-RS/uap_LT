// import { LogLevel } from "angular-auth-oidc-client";

export const environment = {
  production: true,
  staging: false,
  qa: false,
  dev: false,
  local: false,
  encryptionKey: 'unifiedReports',
  ADFBASEURL: 'https://uap-uat.azurewebsites.net',
  MICROCERTREDIRECT: 'https://portaldev.lntiggnite.com/myAssessment',
  API_URL: 'https://uapcoreuat.lntedutech.com',
  NODE_URL: 'https://edgeserviceuat.lntedutech.com',
  UNIFIED_REPORT : 'https://unifiedreport.lntedutech.com/auth/reports/viewreport/'
  // OIDC_CONFIG: {
  //   issuer: 'https://uap-iam.lntiggnite.com/auth/realms/uap',
  //   clientId: 'uap-ui',
  //   logging : LogLevel.Error
  // },
  //   TOKEN_URL: 'https://uap-iam.lntiggnite.com/auth/realms/uap/protocol/openid-connect/token'
};
