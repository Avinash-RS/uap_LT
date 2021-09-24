/**
 * Tasks Response Object
 */

import { ErrorResponse } from '../../common/models/error.model';

export interface TaskTemplateResponse {
  /**
   * List of Tasks
   */
  data: TaskDataModel[];
  /**
   * Pagination Info
   */
  meta: MetaInformationModel;
}

export interface TaskModel {
  data: TaskDataModel[];
  meta: MetaInformationModel;
  failureMessage?: ErrorResponse;
}

export interface TaskDataModel {
  id: number;
  type: string;
  attributes: TaskAttributesModel;
}

export interface TaskAttributesModel {
  name: string;
  type: string;
  subType: string;
  duration: number;
  level: string;

}

export interface MetaInformationModel {
  limit: number;
  offset: number;
  nextOffset: number;
  totalRecordCount: number;
}
