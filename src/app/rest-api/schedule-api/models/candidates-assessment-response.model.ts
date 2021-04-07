import { ErrorResponse } from '../../common/models/error.model';

export interface CandidatesAssessmentResponseModel {
  data: CandidatesAssessmentModel[];
  meta: MetaDataModel;
}
export interface MetaDataModel {
  limit: number;
  offset: number;
  nextOffset: number;
  totalRecordCount?: number;
}
export interface CandidatesAssessmentModel {
  id: string;
  type: string;
  attributes: CandidatesAssessmentAttributeModel;
}
export interface CandidatesAssessmentAttributeModel {
  batchId: number;
  batchName: string;
  emailId: string;
  firstName: string;
  lastName: string;
  inviteStatus: string;
  assessmentStatus: string;
  averageScore: number;
  completedTaskCount: number;
  totalTaskCount: number;
}
export interface CandidatesAssessmentErrorResponse {
  errors: CandidatesAssessmentErrors[];
}

export interface CandidatesAssessmentErrors {
  code: string;
  message: string;
}
export interface CandidatesAssessmentsModel {
  data: CandidatesAssessmentModel[];
  meta: MetaDataModel;
  failureMessage?: ErrorResponse;
}
