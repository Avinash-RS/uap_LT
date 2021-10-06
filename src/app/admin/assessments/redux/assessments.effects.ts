import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AssessmentsActions from './assessments.actions';
import { catchError, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { PackageAPIService } from 'src/app/rest-api/package-api/package-api.service';
import { TaskTemplateResponse } from 'src/app/rest-api/package-api/model/task-template-response.model';
import { PackageResponse } from 'src/app/rest-api/package-api/model/package-response.model';
import { PackageDetailResponse } from 'src/app/rest-api/package-api/model/package-details.model';
import {
  CreateOrUpdatePackageResponse,
  PackageRequest
} from 'src/app/rest-api/package-api/model/package-request.model';
import { go } from 'src/app/reducers/router.actions';
import {
  DeleteAssessmentPackageModel,
  InitCreateASsessmentModel,
  UpdateOrPatchAssessmentModel
} from './assessments.model';

@Injectable()
export class AssessmentsEffects {
  getTaskList$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssessmentsActions.getTasksList),
      map((action) => action.payload.taskType),
      switchMap((taskType: string) =>
        this.packageAPIService.getTasks(taskType).pipe(
          mergeMap((response: TaskTemplateResponse) => [
            AssessmentsActions.getTasksListSuccess({ payload: response })
          ]),
          catchError((error) => [AssessmentsActions.getTasksListFailure({ payload: error })])
        )
      )
    )
  );
  getPackageList$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssessmentsActions.getPackageList),
      map((action) => action.payload),
      switchMap((payload) =>
        this.packageAPIService.getPackages(payload).pipe(
          mergeMap((response: PackageResponse) => [
            AssessmentsActions.getPackageListSuccess({ payload: response })
          ]),
          catchError((error) => [AssessmentsActions.getPackageListFailure({ payload: error })])
        )
      )
    )
  );
  getPackageDetails$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssessmentsActions.initGetPackageDetails),
      map((action) => action.payload),
      switchMap((payload) =>
        this.packageAPIService.getPackage(payload.packageId,payload.orgId).pipe(
          mergeMap((response: PackageDetailResponse) => [
            AssessmentsActions.getPackageDetailsSuccess({ payload: response })
          ]),
          catchError((error) => [AssessmentsActions.getPackageDetailsFailure({ payload: error })])
        )
      )
    )
  );
  loadMorePackageTemplates$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssessmentsActions.loadMorePackageTemplates),
      map((action) => action.payload),
      switchMap((payload) =>
        this.packageAPIService
          .getMorePackageTemplates(payload)
          .pipe(
            mergeMap((response) => [
              AssessmentsActions.loadMorePackageTemplatesSuccess({ payload: response })
            ])
          )
      )
    )
  );
  createAssessmentPackage$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssessmentsActions.initCreateAssessmentPackage),
      map((action) => action.payload),
      exhaustMap((assessmentPackageData: InitCreateASsessmentModel) =>
        this.packageAPIService.createPackage(assessmentPackageData.data).pipe(
          mergeMap((response: CreateOrUpdatePackageResponse) => {
            if (assessmentPackageData.saveButtonClickCount === 0) {
              return [  
                AssessmentsActions.createAssessmentPackageSuccess({ payload: response }),
                go({ payload: { path: ['/admin/assessments/list'] } })
              ];
            } else {
              return [AssessmentsActions.createAssessmentPackageSuccess({ payload: response })];
            }
          }),
          catchError((error) => [
            AssessmentsActions.createAssessmentPackageFailure({ payload: error })
          ])
        )
      )
    )
  );
  updateAssessmentPackage$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssessmentsActions.initUpdateAssessmentPackage),
      map((action) => action.payload),
      switchMap((assessmentPackageData: UpdateOrPatchAssessmentModel) =>
        this.packageAPIService
          .updatePackage(assessmentPackageData.data.id, assessmentPackageData.data)
          .pipe(
            mergeMap((response: PackageRequest) => {
              if (assessmentPackageData.navigateToAssessmentListPage) {
                return [
                  AssessmentsActions.updateAssessmentPackageSuccess({ payload: response }),
                  go({ payload: { path: ['/admin/assessments/list'] } })
                ];
              } else {
                return [AssessmentsActions.updateAssessmentPackageSuccess({ payload: response })];
              }
            }),
            catchError((error) => [
              AssessmentsActions.updateAssessmentPackageFailure({ payload: error })
            ])
          )
      )
    )
  );
  publishAssessmentPackage$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssessmentsActions.initPublishAssessmentPackage),
      map((action) => action.payload),
      switchMap((assessmentPackagePatchData: UpdateOrPatchAssessmentModel) =>
        this.packageAPIService
          .patchPackage(assessmentPackagePatchData.data.id, {
            attributes: {
              fields: assessmentPackagePatchData.data.fields,
              status: assessmentPackagePatchData.data.attributes.status
            }
          })
          .pipe(
            mergeMap(() => [
              AssessmentsActions.publishAssessmentPackageSuccess({
                payload: {
                  success: 'Package Published Successfully'
                }
              }),
              go({ payload: { path: ['/admin/assessments/list'] } })
            ]),
            catchError((error) => [
              AssessmentsActions.publishAssessmentPackageFailure({ payload: { error } })
            ])
          )
      )
    )
  );

  patchAssessmentPackageStatus$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssessmentsActions.initPatchAssessmentPackageStatus),
      map((action) => action.payload),
      switchMap((assessmentPackagePatchData: UpdateOrPatchAssessmentModel) =>
        this.packageAPIService
          .patchPackage(assessmentPackagePatchData.data.id, {
            attributes: {
              fields: assessmentPackagePatchData.data.fields,
              status: assessmentPackagePatchData.data.attributes.status
            }
          })
          .pipe(
            mergeMap(() => {
              if (assessmentPackagePatchData.navigateToAssessmentListPage) {
                return [
                  AssessmentsActions.patchAssessmentPackageStatusSuccess(),
                  go({ payload: { path: ['/admin/assessments/list'] } })
                ];
              } else {
                return [
                  AssessmentsActions.patchAssessmentPackageStatusSuccess(),
                  AssessmentsActions.getPackageList({
                    payload: {
                      pageMetaData: {
                        limit: 30,
                        nextOffset: 0,
                        offset: 0
                      },
                      searchString: '',
                      status: ''
                    }
                  })
                ];
              }
            }),
            catchError((error) => [AssessmentsActions.patchAssessmentPackageStatusFailure()])
          )
      )
    )
  );
  deleteAssessmentPackage$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssessmentsActions.initDeleteAssessmentPackage),
      map((action) => action.payload.packageTemplateId),
      switchMap((packageTemplateId: number) =>
        this.packageAPIService.deletePackage(packageTemplateId).pipe(
          mergeMap(() => [
            AssessmentsActions.deleteAssessmentPackageStatusSuccess(),
            AssessmentsActions.getPackageList({
              payload: {
                pageMetaData: {
                  limit: 30,
                  nextOffset: 0,
                  offset: 0
                },
                searchString: '',
                status: ''
              }
            })
          ]),
          catchError((error) => [AssessmentsActions.deleteAssessmentPackageStatusFailure()])
        )
      )
    )
  );
  constructor(private action$: Actions, private packageAPIService: PackageAPIService) {}
}
