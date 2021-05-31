import { LogLevel } from "angular-auth-oidc-client";

export const environment = {
  production: true,
  API_URL: 'https://uap-api.lntiggnite.com',
  OIDC_CONFIG: {
    issuer: 'https://uap-iam.lntiggnite.com/auth/realms/uap',
    clientId: 'uap-ui',
    logging : LogLevel.Error
  },
  TOKEN_URL: 'https://uap-iam.lntiggnite.com/auth/realms/uap/protocol/openid-connect/token'
};
