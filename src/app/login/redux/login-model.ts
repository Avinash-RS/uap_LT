import { ErrorResponse } from "src/app/rest-api/common/models/error.model";
export interface loginRequest {
    email: string,
    pass: string
}

export interface loginState {
    user: LoginProfileResponseModel;
  }   

  export interface LoginProfileResponseModel {
    data: UserMetaData;
    token: tokenModel;
    // failureMessage?: ErrorResponse;
  }

  export interface tokenModel {
    access_token: string,
    expires_in: number,
    'not-before-policy': number,
    refresh_expires_in: number,
    refresh_token: string,
    scope: string,
    session_state: string,
    token_type: string
  }
    
  export interface UserMetaData {
    id: number;
    type: string;
    attributes: UserAttributes;
  }
  
  export interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    organisations: Array<Organisation>;
  }
  
  export interface Organisation {
    orgId: number;
    orgName: string;
    roles: Array<Role>;
  }
  
  export interface Role {
    roleCode: string;
    permissions: Array<Permission>;
  }
  
  export interface Permission {
    code: string;
    description: string;
  }
  