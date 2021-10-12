import { createAction, props } from '@ngrx/store';
import { ErrorResponse } from 'src/app/rest-api/common/models/error.model';
import { AssessmentTaskModel } from 'src/app/rest-api/assessments-api/models/assessment-response.model';
import { AssessmentTaskUrlModel } from 'src/app/rest-api/assessments-api/models/assessment-task-url-response-model';
import { UpdateAssessmentRequest } from 'src/app/rest-api/assessments-api/models/update-assessment-request.model';

export const getAssessmentTaskList = createAction(
  '[ASSESSMENT MODULE] Get assessmnet tasks list',
  props<{ payload: { assessmentId: string, loginId: string } }>()
);

export const getAssessmentTaskListSuccess = createAction(
  '[ASSESSMENT MODULE] Get assessment tasks list success',
  props<{ payload: AssessmentTaskModel }>()
);

export const getAssessmentTaskListFailure = createAction(
  '[ASSESSMENT MODULE] Get assessment tasks list failure',
  props<{ payload: ErrorResponse }>()
);

export const getAssessmentTaskUrl = createAction(
  '[ASSESSMENT MODULE] Get assessment task URL',
  props<{ payload: { assessmentId: string; taskId: number,loginId: string } }>()
);

export const getAssessmentTaskUrlSuccess = createAction(
  '[ASSESSMENT MODULE] Get assessment task URL success',
  props<{ payload: AssessmentTaskUrlModel }>()
);

export const getAssessmentTaskUrlFailure = createAction(
  '[ASSESSMENT MODULE] Get assessment task URL failure',
  props<{ payload: ErrorResponse }>()
);

export const updateAssessment = createAction(
  '[ASSESSMENT MODULE] Update assessment',
  props<{ payload: { updateData: UpdateAssessmentRequest, assessmentId: string } }>()
);

export const updateAssessmentSuccess = createAction(
  '[ASSESSMENT MODULE] Update assessment success',
  props<{ payload: UpdateAssessmentRequest }>()
);

export const updateAssessmentFailure = createAction(
  '[ASSESSMENT MODULE] Update assessment failure',
  props<{ payload: ErrorResponse }>()
);
