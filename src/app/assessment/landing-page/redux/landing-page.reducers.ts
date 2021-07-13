import { createReducer, on, Action } from '@ngrx/store';
import * as GetAssessmentTaskList from './landing-page.actions';
import { AssessmentTasksReducerState, LandingPageState } from './landing-page.model';
import {
  setInitialAssessmentTaskUrlState,
  setInitialLandingPageState,
  setInitialUpdateAssessmentState
} from './landing-page-reducer.initial.state';

export const initialState: LandingPageState = {
  assessmentTaskList: setInitialLandingPageState(),
  assessmentTaskUrl: setInitialAssessmentTaskUrlState(),
  updateAssessment: setInitialUpdateAssessmentState()
};

export const LandingPageReducer = createReducer(
  initialState,
  on(GetAssessmentTaskList.getAssessmentTaskListSuccess, (state, action) => ({
    ...state,
    assessmentTaskList: action.payload
  })),
  on(GetAssessmentTaskList.getAssessmentTaskListFailure, (state, action) => ({
    ...state,
    assessmentTaskList: {
      ...state.assessmentTaskList,
      failureMessage: action.payload
    }
  })),
  on(GetAssessmentTaskList.getAssessmentTaskUrlSuccess, (state, action) => ({
    ...state,
    assessmentTaskUrl: action.payload
  })),
  on(GetAssessmentTaskList.getAssessmentTaskListFailure, (state, action) => ({
    ...state,
    assessmentTaskUrl: {
      ...state.assessmentTaskUrl,
      failureMessage: action.payload
    }
  })),
  on(GetAssessmentTaskList.updateAssessmentSuccess, (state, action) => ({
    ...state,
    updateAssessment: action.payload
  })),
  on(GetAssessmentTaskList.updateAssessmentFailure, (state, action) => ({
    ...state,
    updateAssessment: {
      ...state.updateAssessment,
      failureMessage: action.payload
    }
  })),
);

export function landingPageReducer(state: LandingPageState, action: Action): LandingPageState {
  return LandingPageReducer(state, action);
}


export const selectAssessmentTasksListState = (state: AssessmentTasksReducerState) =>
  state?.assessmentTasksModule?.assessmentTasksModuleState?.assessmentTaskList;

export const selectAssessmentTaskUrlState = (state: AssessmentTasksReducerState) =>
  state?.assessmentTasksModule?.assessmentTasksModuleState?.assessmentTaskUrl;

export const selectUpdateAssessmentState = (state: AssessmentTasksReducerState) =>
  state?.assessmentTasksModule?.assessmentTasksModuleState?.updateAssessment;
