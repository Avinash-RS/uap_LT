// tslint:disable
/**
 * Assessment Response Object
 */
import { ErrorResponse } from '../../common/models/error.model';
import { AssessmentTaskResponse } from './assessment-task-response-model';

export interface AssessmentTaskModel {
  data: AssessmentTaskDataModel;
  meta?: MetaInformationModel;
  failureMessage?: ErrorResponse;
}

export interface AssessmentTaskDataModel {
  id: number;
  type: string;
  attributes: AssessmentResponse;
  proctorToken:string;
}

export interface AssessmentResponse {
  firstName: string;
  lastName: string;
  emailId: string;
  batchId: string;
  batchName: string;
  sequenceOn: boolean;
  startDateTime: string;
  endDateTime: string;
  duration: number;
  level: string;
  hasAccepted: boolean;
  packageName: string;
  packageDes: string;
  packageId: string;
  currentDateTime:string;
  assessmentTasks: Array<AssessmentTaskResponse>;

}

export interface MetaInformationModel {
  limit: number;
  offset: number;
  nextOffset: number;
  totalRecordCount: number;
}


