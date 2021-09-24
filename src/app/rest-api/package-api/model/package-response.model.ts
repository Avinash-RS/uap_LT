/**
 * Packages Response Object
 */
export interface PackageResponse {
  /**
   * List of Packages
   */
  data: AssesmentPackagesModel[];
  /**
   * Pagination Info
   */
  meta: MetaModel;
}
export interface MetaModel {
  limit: number;
  offset: number;
  nextOffset: number;
  totalRecordCount?: number;
}
export interface AssesmentPackagesModel {
  id: number;
  type: string;
  attributes: PackageAttributeModel;
}
export interface PackageAttributeModel {
  name: string;
  description: string;
  status: string;
  level: string;
  duration: number;
  usageCount: number;
  updatedBy: string;
  updatedTime: string;
  tasks: TaskModel[];
}
export interface TaskModel {
  id: number;
  name: string;
  type: string;
  subType: string;
  duration: number;

}
export interface PackageTemplateErrorResponse {
  errors: PackageTemplateErrors[];
}

export interface PackageTemplateErrors {
  code: string;
  message: string;
}
export interface PackageModel {
  data: AssesmentPackagesModel[];
  meta: MetaModel;
  failureMessage?: PackageTemplateErrorResponse;
}
