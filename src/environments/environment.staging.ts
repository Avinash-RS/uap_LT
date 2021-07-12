import { LogLevel } from "angular-auth-oidc-client";

export const environment = {
  production: true,
  API_URL: 'https://uapcoreuat.lntedutech.com',
  OIDC_CONFIG: {
    issuer: 'https://assessecouat-iam.lntedutech.com/auth/realms/uap',
    clientId: 'uap-ui',
    logging : LogLevel.Error
  },
  TOKEN_URL: 'https://assessecouat-iam.lntedutech.com/auth/realms/uap/protocol/openid-connect/token'
};
