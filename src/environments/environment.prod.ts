// import { LogLevel } from "angular-auth-oidc-client";

export const environment = {
  production: true,
  staging: false,
  qa: false,
  dev: false,
  local: false,
  MICROCERTREDIRECT: 'https://certification.lntedutech.com/myAssessment',
  API_URL: 'https://uapcore.lntedutech.com',
  NODE_URL: 'https://edgeservice.lntedutech.com'
  // OIDC_CONFIG: {
  //   issuer: 'https://uap-iam.lntiggnite.com/auth/realms/uap',
  //   clientId: 'uap-ui',
  //   logging : LogLevel.Error
  // },
  //   TOKEN_URL: 'https://uap-iam.lntiggnite.com/auth/realms/uap/protocol/openid-connect/token'
};
