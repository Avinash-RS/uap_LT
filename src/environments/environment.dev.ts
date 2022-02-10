// import { LogLevel } from "angular-auth-oidc-client";

export const environment = {
  production: false,
  staging: false,
  qa: false,
  dev: true,
  local: false,
  encryptionKey: 'unifiedReports',
  ADFBASEURL: 'https://uap-uat.azurewebsites.net',
  MICROCERTREDIRECT: 'https://certification.lntiggnite.com/myAssessment',
  API_URL: 'https://uapdev-api.lntiggnite.com',
  NODE_URL: 'https://uapedgeservice.lntiggnite.com',
  UNIFIED_REPORT : 'https://unifiedreport-dev.lntedutech.com/auth/reports/viewreport/'
//   OIDC_CONFIG: {
//     issuer: 'https://uap-iam.lntiggnite.com/auth/realms/uap',
//     clientId: 'uap-ui',
//     logging : LogLevel.Error
//   },
//   TOKEN_URL: 'https://uap-iam.lntiggnite.com/auth/realms/uap/protocol/openid-connect/token'
};
