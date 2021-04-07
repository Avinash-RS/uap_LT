import { createAction, props } from '@ngrx/store';
import { ErrorResponse } from 'src/app/rest-api/common/models/error.model';
import { PackageDetailResponse } from 'src/app/rest-api/package-api/model/package-details.model';
import {
  PackageResponse,
  PackageTemplateErrorResponse
} from 'src/app/rest-api/package-api/model/package-response.model';
import { LoadMorePackageTemplatesModel } from '../../assessments/redux/assessments.model';
import {
  LoadMoreScheduledAssessmentsModel,
  LoadMoreCandidatesAssessmentsModel
} from './schedule.model';
import {
  ScheduledAssessmentResponseModel,
  ScheduledAssessmentTemplateErrorResponse
} from 'src/app/rest-api/schedule-api/models/scheduled-assessments-response.model';
import {
  CandidatesAssessmentResponseModel,
  CandidatesAssessmentErrorResponse
} from 'src/app/rest-api/schedule-api/models/candidates-assessment-response.model';
import {
  CreateSchedulePackageResponse,
  ScheduleRequest
} from 'src/app/rest-api/schedule-api/models/schedule-assessment-request.model';
import { CandidateReportResponseModel } from 'src/app/rest-api/schedule-api/models/candidate-report-response.model';

export const getPackageList = createAction(
  '[SCHEDULE MODULE] Get package list',
  props<{ payload: LoadMorePackageTemplatesModel }>()
);

export const getPackageListSuccess = createAction(
  '[SCHEDULE MODULE] Get package list success',
  props<{ payload: PackageResponse }>()
);

export const getPackageListFailure = createAction(
  '[SCHEDULE MODULE] Get package list failure',
  props<{ payload: PackageTemplateErrorResponse }>()
);

export const initGetPackageDetails = createAction(
  '[SCHEDULE MODULE] Init Get package details',
  props<{ payload: { packageId: string } }>()
);

export const getPackageDetailsSuccess = createAction(
  '[SCHEDULE MODULE] Get package details success',
  props<{ payload: PackageDetailResponse }>()
);

export const getPackageDetailsFailure = createAction(
  '[SCHEDULE MODULE] Get package details failure',
  props<{ payload: ErrorResponse }>()
);

export const clearPackageDetailsState = createAction(
  '[SCHEDULE MODULE] Clear package details state'
);

export const getScheduledAssessment = createAction(
  '[SCHEDULE MODULE] Get scheduled assessment list',
  props<{ payload: LoadMoreScheduledAssessmentsModel }>()
);

export const getScheduledAssessmentSuccess = createAction(
  '[SCHEDULE MODULE] Get scheduled assessment list success',
  props<{ payload: ScheduledAssessmentResponseModel }>()
);

export const getScheduledAssessmentFailure = createAction(
  '[SCHEDULE MODULE] Get scheduled assessment list failure',
  props<{ payload: ScheduledAssessmentTemplateErrorResponse }>()
);

export const loadMoreScheduledAssessment = createAction(
  '[SCHEDULE MODULE] Load more scheduled assessment list',
  props<{ payload: LoadMoreScheduledAssessmentsModel }>()
);

export const loadMoreScheduledAssessmentSuccess = createAction(
  '[SCHEDULE MODULE] Load more scheduled assessment list Success',
  props<{ payload: ScheduledAssessmentResponseModel }>()
);

export const getCandidatesAssessments = createAction(
  '[SCHEDULE MODULE] Get candidates assessments list',
  props<{ payload: LoadMoreCandidatesAssessmentsModel }>()
);

export const getCandidatesAssessmentsSuccess = createAction(
  '[SCHEDULE MODULE] Get candidates assessments list success',
  props<{ payload: CandidatesAssessmentResponseModel }>()
);
export const getCandidatesAssessmentsFailure = createAction(
  '[SCHEDULE MODULE] Get candidates assessments list failure',
  props<{ payload: CandidatesAssessmentErrorResponse }>()
);

export const loadMoreCandidatesAssessments = createAction(
  '[SCHEDULE MODULE] Load more candidates assessments list',
  props<{ payload: LoadMoreCandidatesAssessmentsModel }>()
);

export const loadMoreCandidatesAssessmentsSuccess = createAction(
  '[SCHEDULE MODULE] Load more candidates assessments list Success',
  props<{ payload: CandidatesAssessmentResponseModel }>()
);

export const initCreateScheduleAssessmentPackage = createAction(
  '[SCHEDULE MODULE] Init Create schedule assessment package',
  props<{
    payload: {
      data: ScheduleRequest;
    };
  }>()
);

export const createScheduleAssessmentPackageSuccess = createAction(
  '[SCHEDULE MODULE] Create schedule assessment package success',
  props<{ payload: CreateSchedulePackageResponse }>()
);

export const createScheduleAssessmentPackageFailure = createAction(
  '[SCHEDULE MODULE] Create schedule assessment package failure',
  props<{ payload: ErrorResponse }>()
);

export const resetCreateScheduleAsessmentPackageSnackBarMessage = createAction(
  '[SCHEDULE MODULE] Reset Create schedule assessment snack bar message',
  props<{ payload: { snackbarMessage: string } }>()
);

export const getCandidatesAssessmentExport = createAction(
  '[SCHEDULE MODULE] Get Candidates Assessment Export',
  props<{ payload: LoadMoreCandidatesAssessmentsModel }>()
);
export const getCandidatesAssessmentExportSuccess = createAction(
  '[SCHEDULE MODULE] Get Candidates Assessment Export success',
  props<{ payload: CandidatesAssessmentResponseModel }>()
);

export const getCandidateReport = createAction(
  '[SCHEDULE MODULE] Get Candidate report',
  props<{ payload: { assessmentId: string } }>()
);
export const getCandidateReportSuccess = createAction(
  '[SCHEDULE MODULE] Get Candidate report success',
  props<{ payload: CandidateReportResponseModel }>()
);
export const getCandidateReportFailure = createAction(
  '[SCHEDULE MODULE] Get Candidate report failure',
  props<{ payload: ErrorResponse }>()
);

export const clearCandidatesAssessmentExportData = createAction(
  '[SCHEDULE MODULE] Clear Candidates Assessment Export  state'
);
export const clearCandidatesReportData = createAction(
  '[SCHEDULE MODULE] Clear Candidates report  state'
);

export const initReinviteAssessment = createAction(
  '[ASSESSMENTS MODULE] Init Reinvite assessment status',
  props<{
    payload: {
      packageTemplateId: string;
    };
  }>()
);

export const reinviteAssessmentSuccess = createAction(
  '[ASSESSMENTS MODULE] Reinvite assessment status success',
  props<{ payload: { success: string } }>()
);

export const reinviteAssessmentFailure = createAction(
  '[ASSESSMENTS MODULE] Reinvite assessment status failure',
  props<{ payload: ErrorResponse }>()
);

export const clearReinviteAssessmentState = createAction(
  '[ASSESSMENTS MODULE] Clear Reinvite assessment status'
);
