import { ErrorResponse } from '../../common/models/error.model';

/**
 * Package Response Object
 */
export interface PackageDetailResponse {
  /**
   * Package Response
   */
  data: PackageDetailsData;
  failureMessage?: ErrorResponse;
}

export interface PackageDetailsData {
  id: number;
  type: string;
  attributes: PackageDetailsAttributes;
}

export interface PackageDetailsAttributes {
  name: string;
  description: string;
  status: string;
  type: string;
  level: string;
  duration: number;
  usageCount: number;
  updatedBy: string;
  updatedTime: string;
  tasks: PackageTaskAttributesModel[];
}

export interface PackageTaskAttributesModel {
  id: number;
  name: string;
  type: string;
  subType: string;
  duration: number;
  level?: string;
  
}
