/**
 * Package Request Attributes
 */

export interface PackageRequest {
  id?: string;
  type?: string;
  fields?: string[];
  attributes: PackageRequestDataAttributes;
}

export interface CreateOrUpdatePackageResponse {
  data: PackageResponseData;
}

export interface PackageResponseData {
  id: string;
  type: string;
}

export interface PackageRequestDataAttributes {
  /**
   * Package Name - Unique to UAP
   */
  name?: string;
  /**
   * Status of Package - Draft/Published/Archive
   */
  status?: string;
  /**
   * Package Description
   */
  description?: string;
  /**
   * Package Level
   */
  level?: string;
  /**
   * Package last created or updated by
   */
  updatedBy?: number;
  /**
   * Sequence to be followed in tasks - boolean
   */
  sequenceOn?: boolean;
  /**
   * List of Task Template Ids
   */
  fields?: string[];
  taskIds?: (number | undefined)[];
}
