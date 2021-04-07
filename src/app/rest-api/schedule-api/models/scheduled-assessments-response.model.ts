import { ErrorResponse } from '../../common/models/error.model';

export interface ScheduledAssessmentResponseModel {
  data: ScheduledAssessmentModel[];
  meta: MetaDataModel;
}
export interface MetaDataModel {
  limit: number;
  offset: number;
  nextOffset: number;
  totalRecordCount?: number;
}
export interface ScheduledAssessmentModel {
  id: string;
  type: string;
  attributes: ScheduledAssessmentAttributeModel;
}
export interface ScheduledAssessmentAttributeModel {
  batchName: string;
  packageTemplateName: string;
  startDateTime: string;
  endDateTime: string;
  duration: number;
  numberOfInvites: number;
  status: string;
}
export interface ScheduledAssessmentTemplateErrorResponse {
  errors: ScheduledAssessmentTemplateErrors[];
}

export interface ScheduledAssessmentTemplateErrors {
  code: string;
  message: string;
}

export interface AssessmentsModel {
  data: ScheduledAssessmentModel[];
  meta: MetaDataModel;
  failureMessage?: ErrorResponse;
}
