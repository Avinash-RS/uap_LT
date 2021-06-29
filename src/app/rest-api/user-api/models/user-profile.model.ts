import { ErrorResponse } from '../../common/models/error.model';

export interface UserProfileResponseModel {
  data: UserMetaData;
  // token: tokenData;
  failureMessage?: ErrorResponse;
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
