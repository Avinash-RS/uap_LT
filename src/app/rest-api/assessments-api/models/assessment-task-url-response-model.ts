import { ErrorResponse } from '../../common/models/error.model';

export interface AssessmentTaskUrlModel {
  failureMessage?: ErrorResponse;
  id: number;
  type: string;
  attributes: AttributesModel;
}

export interface AttributesModel {
  taskSource: string;
  srcTaskId: string;
  taskUrl: string;
}
