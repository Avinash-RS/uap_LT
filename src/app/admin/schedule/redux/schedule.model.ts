import * as fromRoot from 'src/app/reducers/index';
import { PackageDetailResponse } from 'src/app/rest-api/package-api/model/package-details.model';
import { PackageModel } from 'src/app/rest-api/package-api/model/package-response.model';
import {
  MetaDataModel,
  AssessmentsModel
} from 'src/app/rest-api/schedule-api/models/scheduled-assessments-response.model';
import { CandidatesAssessmentsModel } from 'src/app/rest-api/schedule-api/models/candidates-assessment-response.model';
import { ScheduleAssesmentPackage } from './schedule-reducer.inital.states';
import { CandidateReportResponseModel } from 'src/app/rest-api/schedule-api/models/candidate-report-response.model';
import { ErrorResponse } from 'src/app/rest-api/common/models/error.model';

export interface ScheduleState {
  packageList: PackageModel;
  packageDetails: PackageDetailResponse;
  scheduledAssessmentList: AssessmentsModel;
  loadMoreScheduledAssessment: boolean;
  candidatesAssessmentsList: CandidatesAssessmentsModel;
  loadMoreCandidatesAssessments: boolean;
  createScheduleAssessmentPackage: ScheduleAssesmentPackage;
  candidatesAssessmentExportList: CandidatesAssessmentsModel;
  CandidateReportState: CandidateReportResponseModel;
  reInviteCandidateAssessmentStatus: ReInviteCandidateAssessmentStatusModel;
}
export interface LoadMoreScheduledAssessmentsModel {
  pageMetaData: MetaDataModel;
  searchString: string;
  status: string;
}
export interface LoadMoreCandidatesAssessmentsModel {
  pageMetaData?: MetaDataModel;
  assessmentStatus?: string;
  searchString: string;
  status?: string;
  batchId: string;
}
export interface FilterValueModel {
  value: string;
  viewValue: string;
}
export interface SchedulerReducerState extends fromRoot.AppState {
  scheduleAssessmentModule: { scheduleAssessmentModuleState: ScheduleState };
}

export interface ExportAttributeModel {
  emailId: string;
  firstName: string;
  lastName: string;
  inviteStatus?: string;
  assessmentStatus?: string;
  averageScore?: string;
  testCompletion?: string;
}

export interface ReInviteCandidateAssessmentStatusModel {
  success: string;
  failureMessage?: ErrorResponse;
}
