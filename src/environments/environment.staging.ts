// import { LogLevel } from "angular-auth-oidc-client";

export const environment = {
  production: false,
  staging: true,
  qa: false,
  dev: false,
  local: false,
  ADFBASEURL: 'https://uap-uat.azurewebsites.net',
  MICROCERTREDIRECT: 'https://certification.lntedutech.com/myAssessment',
  API_URL: 'https://uapcore.lntedutech.com',
  NODE_URL: 'https://uapedgeservice.lntiggnite.com',
//   OIDC_CONFIG: {
//     issuer: 'https://uap-iam.lntiggnite.com/auth/realms/uap',
//     clientId: 'uap-ui',
//     logging : LogLevel.Error
//   },
//   TOKEN_URL: 'https://uap-iam.lntiggnite.com/auth/realms/uap/protocol/openid-connect/token'
};
