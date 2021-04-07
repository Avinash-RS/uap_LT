import * as fromRoot from 'src/app/reducers/index';
import { AssessmentTaskModel } from 'src/app/rest-api/assessments-api/models/assessment-response.model';
import { AssessmentTaskUrlModel } from 'src/app/rest-api/assessments-api/models/assessment-task-url-response-model';
import { UpdateAssessmentRequest } from 'src/app/rest-api/assessments-api/models/update-assessment-request.model';

export interface LandingPageState {
  assessmentTaskList: AssessmentTaskModel;
  assessmentTaskUrl: AssessmentTaskUrlModel;
  updateAssessment: UpdateAssessmentRequest;
}

export interface AssessmentTasksReducerState extends fromRoot.AppState {
  assessmentTasksModule: { assessmentTasksModuleState: LandingPageState };
}
