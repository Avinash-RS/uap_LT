import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as AssessmentTasksActions from './landing-page.actions';
import { AssessmentAPIService } from 'src/app/rest-api/assessments-api/assessments-api.service';
import { AssessmentTaskModel } from 'src/app/rest-api/assessments-api/models/assessment-response.model';
import { AssessmentTaskUrlModel } from 'src/app/rest-api/assessments-api/models/assessment-task-url-response-model';
import { UpdateAssessmentRequest } from 'src/app/rest-api/assessments-api/models/update-assessment-request.model';

@Injectable()
export class LandingPageEffects {
  getAssessmentTasksList$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssessmentTasksActions.getAssessmentTaskList),
      map((action) => action.payload),
      switchMap((payloads: any) =>
        this.assessmentAPIService.getAssessment(payloads.assessmentId, payloads.loginId).pipe(
          mergeMap((response: AssessmentTaskModel) => [
            AssessmentTasksActions.getAssessmentTaskListSuccess({ payload: response })
          ]),
          catchError((error) => [
            AssessmentTasksActions.getAssessmentTaskListFailure({ payload: error })
          ])
        )
      )
    )
  );

  getAssessmentTaskUrl$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssessmentTasksActions.getAssessmentTaskUrl),
      map((action) => action.payload),
      switchMap((payload) =>
        this.assessmentAPIService.getAssessmentTaskUrl(payload.assessmentId, payload.taskId,payload.loginId).pipe(
          mergeMap((response: AssessmentTaskUrlModel) => [
            AssessmentTasksActions.getAssessmentTaskUrlSuccess({ payload: response })
          ]),
          catchError((error) => [
            AssessmentTasksActions.getAssessmentTaskUrlFailure({ payload: error })
          ])
        )
      )
    )
  );

  updateAssessmentRequest = createEffect(() =>
    this.action$.pipe(
      ofType(AssessmentTasksActions.updateAssessment),
      map((action) => action.payload),
      switchMap((payload) =>
        this.assessmentAPIService.updateAssessment(payload.assessmentId, payload.updateData).pipe(
          mergeMap((response: UpdateAssessmentRequest) => [
            AssessmentTasksActions.updateAssessmentSuccess({ payload: response })
          ]),
          catchError((error) => [
            AssessmentTasksActions.updateAssessmentFailure({ payload: error })
          ])
        )
      )
    )
  );

  constructor(private action$: Actions, private assessmentAPIService: AssessmentAPIService) {}
}
