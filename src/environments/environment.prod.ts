import { LogLevel } from "angular-auth-oidc-client";

export const environment = {
  production: true,
  API_URL: '<specify-end-point>',
  OIDC_CONFIG: {
    issuer: 'https://uap-iam.lntiggnite.com/auth/realms/uap',
    clientId: 'uap-ui',
    logging : LogLevel.Error
  }
};
