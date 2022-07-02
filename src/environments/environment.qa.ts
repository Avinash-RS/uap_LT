// import { LogLevel } from "angular-auth-oidc-client";

export const environment = {
  production: false,
  staging: false,
  qa: true,
  dev: false,
  local: false,
  encryptionKey: 'unifiedReports',
  ADFBASEURL: 'https://uap-uat.azurewebsites.net',
  MICROCERTREDIRECT: 'https://certificationqa.lntiggnite.com/myAssessment',
  API_URL: 'https://uap-api.lntiggnite.com',
  NODE_URL: 'https://uapqaedgeservice.lntedutech.com',
  UNIFIED_REPORT : 'https://unifiedreportqa.lntedutech.com/auth/reports/viewreport/'
//   OIDC_CONFIG: {
//     issuer: 'https://uap-iam.lntiggnite.com/auth/realms/uap',
//     clientId: 'uap-ui',
//     logging : LogLevel.Error
//   },
//   TOKEN_URL: 'https://uap-iam.lntiggnite.com/auth/realms/uap/protocol/openid-connect/token'
};
