import { LogLevel } from "angular-auth-oidc-client";

export const environment = {
  production: true,
  API_URL: '<specify-end-point>',
  OIDC_CONFIG: {
    issuer: 'https://iam-staging.skiquo.io/auth/realms/kodepro',
    clientId: 'uap-ui',
    logging : LogLevel.Error
  }
};
