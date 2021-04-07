import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as ScheduleActions from './schedule.actions';
import { PackageAPIService } from 'src/app/rest-api/package-api/package-api.service';
import { catchError, concatMap, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { PackageResponse } from 'src/app/rest-api/package-api/model/package-response.model';
import { PackageDetailResponse } from 'src/app/rest-api/package-api/model/package-details.model';
import { ScheduleAPIService } from 'src/app/rest-api/schedule-api/schedule-api.service';
import { ScheduledAssessmentResponseModel } from 'src/app/rest-api/schedule-api/models/scheduled-assessments-response.model';
import { CandidatesAssessmentResponseModel } from 'src/app/rest-api/schedule-api/models/candidates-assessment-response.model';
import { go } from 'src/app/reducers/router.actions';
import { InitScheduleCreateAssessmentModel } from '../create-schedule-package/create-schedule-package.model';
import { CreateSchedulePackageResponse } from 'src/app/rest-api/schedule-api/models/schedule-assessment-request.model';
import { clearPackageDetailsState } from '../../assessments/redux/assessments.actions';
import { CandidateReportResponseModel } from 'src/app/rest-api/schedule-api/models/candidate-report-response.model';
import { AssessmentAPIService } from 'src/app/rest-api/assessments-api/assessments-api.service';

@Injectable()
export class ScheduleEffects {
  getPackageList$ = createEffect(() =>
    this.action$.pipe(
      ofType(ScheduleActions.getPackageList),
      map((action) => action.payload),
      switchMap((payload) =>
        this.packageAPIService.getPackages(payload).pipe(
          mergeMap((response: PackageResponse) => [
            ScheduleActions.getPackageListSuccess({ payload: response })
          ]),
          catchError((error) => [ScheduleActions.getPackageListFailure({ payload: error })])
        )
      )
    )
  );

  getPackageDetails$ = createEffect(() =>
    this.action$.pipe(
      ofType(ScheduleActions.initGetPackageDetails),
      map((action) => action.payload.packageId),
      switchMap((packageId: string) =>
        this.packageAPIService.getPackage(packageId).pipe(
          mergeMap((response: PackageDetailResponse) => [
            ScheduleActions.getPackageDetailsSuccess({ payload: response })
          ]),
          catchError((error) => [ScheduleActions.getPackageDetailsFailure({ payload: error })])
        )
      )
    )
  );

  getScheduledAssessment$ = createEffect(() =>
    this.action$.pipe(
      ofType(ScheduleActions.getScheduledAssessment),
      map((action) => action.payload),
      switchMap((payload) =>
        this.scheduleAPIService.getScheduledAssessment(payload).pipe(
          mergeMap((response: ScheduledAssessmentResponseModel) => [
            ScheduleActions.getScheduledAssessmentSuccess({ payload: response })
          ]),
          catchError((error) => [ScheduleActions.getScheduledAssessmentFailure({ payload: error })])
        )
      )
    )
  );
  loadMoreScheduledAssessmentTemplates$ = createEffect(() =>
    this.action$.pipe(
      ofType(ScheduleActions.loadMoreScheduledAssessment),
      map((action) => action.payload),
      switchMap((payload) =>
        this.scheduleAPIService.getMoreScheduledAssessmentTemplates(payload).pipe(
          mergeMap((response: ScheduledAssessmentResponseModel) => [
            ScheduleActions.loadMoreScheduledAssessmentSuccess({ payload: response })
          ]),
          catchError((error) => [ScheduleActions.getScheduledAssessmentFailure({ payload: error })])
        )
      )
    )
  );
  getCandidatesAssessment$ = createEffect(() =>
    this.action$.pipe(
      ofType(ScheduleActions.getCandidatesAssessments),
      map((action) => action.payload),
      switchMap((payload) =>
        this.scheduleAPIService.getCandidatesAssessment(payload).pipe(
          mergeMap((response: CandidatesAssessmentResponseModel) => [
            ScheduleActions.getCandidatesAssessmentsSuccess({ payload: response })
          ]),
          catchError((error) => [
            ScheduleActions.getCandidatesAssessmentsFailure({ payload: error })
          ])
        )
      )
    )
  );
  loadMoreCandidatesAssessment$ = createEffect(() =>
    this.action$.pipe(
      ofType(ScheduleActions.loadMoreCandidatesAssessments),
      map((action) => action.payload),
      switchMap((payload) =>
        this.scheduleAPIService.getMoreCandidatesAssessment(payload).pipe(
          mergeMap((response: CandidatesAssessmentResponseModel) => [
            ScheduleActions.loadMoreCandidatesAssessmentsSuccess({ payload: response })
          ]),
          catchError((error) => [
            ScheduleActions.getCandidatesAssessmentsFailure({ payload: error })
          ])
        )
      )
    )
  );
  createScheduleAssessmentPackage$ = createEffect(() =>
    this.action$.pipe(
      ofType(ScheduleActions.initCreateScheduleAssessmentPackage),
      map((action) => action.payload),
      exhaustMap((scheduleAssessmentPackageData: InitScheduleCreateAssessmentModel) =>
        this.scheduleAPIService.createSchedulePackage(scheduleAssessmentPackageData.data).pipe(
          mergeMap((response: CreateSchedulePackageResponse) => [
            ScheduleActions.createScheduleAssessmentPackageSuccess({ payload: response }),
            go({ payload: { path: ['/admin/schedule/list'] } })
          ]),
          catchError((error) => [
            ScheduleActions.createScheduleAssessmentPackageFailure({ payload: error })
          ])
        )
      )
    )
  );
  getCandidatesAssessmentExports$ = createEffect(() =>
    this.action$.pipe(
      ofType(ScheduleActions.getCandidatesAssessmentExport),
      map((action) => action.payload),
      exhaustMap((payload) =>
        this.scheduleAPIService.getCandidatesAssessment(payload).pipe(
          mergeMap((response: CandidatesAssessmentResponseModel) => [
            ScheduleActions.getCandidatesAssessmentExportSuccess({ payload: response })
          ]),
          catchError((error) => [
            ScheduleActions.getCandidatesAssessmentsFailure({ payload: error })
          ])
        )
      )
    )
  );
  reInviteAssessment$ = createEffect(() =>
    this.action$.pipe(
      ofType(ScheduleActions.initReinviteAssessment),
      map((action) => action.payload.packageTemplateId),
      concatMap((packageTemplateId: string) =>
        this.assessmentAPIService.reInviteAssessment(packageTemplateId).pipe(
          mergeMap((response: CreateSchedulePackageResponse) => {
            return [
              ScheduleActions.reinviteAssessmentSuccess({
                payload: {
                  success: 'Assessment Re-Invited To Candidate Successfully'
                }
              })
            ];
          }),
          catchError((error) => [ScheduleActions.reinviteAssessmentFailure({ payload: error })])
        )
      )
    )
  );
  getCandidateReport$ = createEffect(() =>
    this.action$.pipe(
      ofType(ScheduleActions.getCandidateReport),
      map((action) => action.payload.assessmentId),
      exhaustMap((assessmentId) =>
        this.assessmentAPIService.getReport(assessmentId).pipe(
          mergeMap((response: CandidateReportResponseModel) => [
            ScheduleActions.getCandidateReportSuccess({ payload: response })
          ]),
          catchError((error) => [ScheduleActions.getCandidateReportFailure({ payload: error })])
        )
      )
    )
  );
  constructor(
    private action$: Actions,
    private packageAPIService: PackageAPIService,
    private scheduleAPIService: ScheduleAPIService,
    private assessmentAPIService: AssessmentAPIService
  ) {}
}
