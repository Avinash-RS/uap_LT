import { ErrorResponse } from '../../common/models/error.model';

export interface CandidateReportResponseModel {
  data: CandidateReportModel;
  failureMessage?: ErrorResponse;
}
export interface CandidateReportModel {
  id: string;
  type: string;
  attributes: CandidateReportAttributeModel;
}
export interface CandidateReportAttributeModel {
  id: number;
  assessmentId: string;
  startTime: string;
  endTime: string;
  completedTime: string;
  status: string;
  consolidatedScore: number;
  batchName: string;
  userDetails: UserDetailModel;
  taskResults: TaskResultModel[];
}
export interface UserDetailModel {
  firstName: string;
  lastName: string;
  email: string;
}
export interface TaskResultModel {
  id: number;
  taskName: string;
  taskType: string;
  taskSubType: string;
  taskStatus: string;
  taskStartTime: string;
  taskEndTime: string;
  taskCompletedTime: string;
  passCnt: number;
  score: number;
  failCnt: number;
  generatedTime: string;
}
