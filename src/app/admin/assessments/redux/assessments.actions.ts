import { createAction, props } from '@ngrx/store';
import { TaskTemplateResponse } from 'src/app/rest-api/package-api/model/task-template-response.model';
import {
  PackageResponse,
  PackageTemplateErrorResponse
} from 'src/app/rest-api/package-api/model/package-response.model';
import { PackageDetailResponse } from 'src/app/rest-api/package-api/model/package-details.model';
import { ErrorResponse } from 'src/app/rest-api/common/models/error.model';
import { LoadMorePackageTemplatesModel } from './assessments.model';
import {
  CreateOrUpdatePackageResponse,
  PackageRequest
} from 'src/app/rest-api/package-api/model/package-request.model';

export const getTasksList = createAction(
  '[ASSESSMENTS MODULE] Get tasks list',
  props<{
    payload: {
      taskType: string;
    };
  }>()
);

export const getTasksListSuccess = createAction(
  '[ASSESSMENTS MODULE] Get tasks list success',
  props<{ payload: TaskTemplateResponse }>()
);

export const getTasksListFailure = createAction(
  '[ASSESSMENTS MODULE] Get tasks list failure',
  props<{ payload: ErrorResponse }>()
);

export const getPackageList = createAction(
  '[ASSESSMENTS MODULE] Get package list',
  props<{ payload: LoadMorePackageTemplatesModel }>()
);

export const getPackageListSuccess = createAction(
  '[ASSESSMENTS MODULE] Get package list success',
  props<{ payload: PackageResponse }>()
);

export const getPackageListFailure = createAction(
  '[ASSESSMENTS MODULE] Get package list failure',
  props<{ payload: PackageTemplateErrorResponse }>()
);

export const initGetPackageDetails = createAction(
  '[ASSESSMENTS MODULE] Init Get package details',
  props<{ payload: { packageId: string,orgId:string } }>()
);

export const getPackageDetailsSuccess = createAction(
  '[ASSESSMENTS MODULE] Get package details success',
  props<{ payload: PackageDetailResponse }>()
);

export const getPackageDetailsFailure = createAction(
  '[ASSESSMENTS MODULE] Get package details failure',
  props<{ payload: ErrorResponse }>()
);

export const clearPackageDetailsState = createAction(
  '[ASSESSMENTS MODULE] Clear package details state'
);
export const loadMorePackageTemplates = createAction(
  '[ASSESSMENT MODULE] Load more package templates',
  props<{ payload: LoadMorePackageTemplatesModel }>()
);
export const loadMorePackageTemplatesSuccess = createAction(
  '[ASSESSMENT MODULE] Load more package templates Success',
  props<{ payload: PackageResponse }>()
);

export const initCreateAssessmentPackage = createAction(
  '[ASSESSMENTS MODULE] Init Create assessment package',
  props<{
    payload: {
      data: PackageRequest;
      saveButtonClickCount: number;
    };
  }>()
);

export const createAssessmentPackageSuccess = createAction(
  '[ASSESSMENTS MODULE] Create assessment package success',
  props<{ payload: CreateOrUpdatePackageResponse }>()
);

export const createAssessmentPackageFailure = createAction(
  '[ASSESSMENTS MODULE] Create assessment package failure',
  props<{ payload: ErrorResponse }>()
);

export const resetCreateAsessmentPackageSnackBarMessage = createAction(
  '[ASSESSMENTS MODULE] Reset Create assessment snack bar message',
  props<{ payload: { snackbarMessage: string } }>()
);

export const initUpdateAssessmentPackage = createAction(
  '[ASSESSMENTS MODULE] Init Update assessment package success',
  props<{
    payload: {
      data: PackageRequest;
      navigateToAssessmentListPage: boolean;
    };
  }>()
);

export const updateAssessmentPackageSuccess = createAction(
  '[ASSESSMENTS MODULE] Update assessment package success',
  props<{ payload: PackageRequest }>()
);

export const updateAssessmentPackageFailure = createAction(
  '[ASSESSMENTS MODULE] Update assessment package failure',
  props<{ payload: ErrorResponse }>()
);

export const clearCreateAssessmentPackageState = createAction(
  '[ASSESSMENTS MODULE] Clear Create assessment package state'
);

export const initPatchAssessmentPackageStatus = createAction(
  '[ASSESSMENTS MODULE] Init Patch assessment package status',
  props<{
    payload: {
      data: PackageRequest;
      navigateToAssessmentListPage: boolean;
    };
  }>()
);

export const patchAssessmentPackageStatusSuccess = createAction(
  '[ASSESSMENTS MODULE] Patch assessment package status success'
);

export const patchAssessmentPackageStatusFailure = createAction(
  '[ASSESSMENTS MODULE] Patch assessment package status failure'
);

export const initDeleteAssessmentPackage = createAction(
  '[ASSESSMENTS MODULE] Init Delete assessment package status',
  props<{
    payload: {
      packageTemplateId: number;
    };
  }>()
);

export const deleteAssessmentPackageStatusSuccess = createAction(
  '[ASSESSMENTS MODULE] Delete assessment package status success'
);

export const deleteAssessmentPackageStatusFailure = createAction(
  '[ASSESSMENTS MODULE] Delete assessment package status failure'
);

export const initPublishAssessmentPackage = createAction(
  '[ASSESSMENTS MODULE] Init publish assessment package status',
  props<{
    payload: {
      data: PackageRequest;
      navigateToAssessmentListPage: boolean;
    };
  }>()
);

export const publishAssessmentPackageSuccess = createAction(
  '[ASSESSMENTS MODULE] publish assessment package status success',
  props<{ payload: { success: string } }>()
);

export const publishAssessmentPackageFailure = createAction(
  '[ASSESSMENTS MODULE] publish assessment package status failure',
  props<{ payload: ErrorResponse }>()
);

export const clearPublishAssessmentPackageStatus = createAction(
  '[ASSESSMENTS MODULE] clear publish assessment package status'
);
