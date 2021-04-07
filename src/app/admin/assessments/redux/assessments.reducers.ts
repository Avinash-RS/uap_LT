import { Action, createReducer, on } from '@ngrx/store';
import { AssessmentsModuleEnum } from '../assessments.enums';
import {
  createAssessmentPackage,
  setInitalPackageDetailsState,
  setInitalPublishAssessmentPackageStatus
} from './assessments-reducer.inital.states';
import * as AssessmentsActions from './assessments.actions';
import { AssessmentsReducerState, AssessmentState } from './assessments.model';

const initialState: AssessmentState = {
  tasksList: {
    data: [],
    meta: {
      limit: 0,
      offset: 0,
      nextOffset: 0,
      totalRecordCount: 0
    },
    failureMessage: {
      error: {
        errors: []
      }
    }
  },
  packageList: {
    data: [],
    meta: {
      limit: 0,
      offset: 0,
      nextOffset: 0,
      totalRecordCount: 0
    },
    failureMessage: {
      errors: []
    }
  },
  loadMorePackageTemplates: false,
  packageDetails: setInitalPackageDetailsState(),
  createAssessmentPackage: createAssessmentPackage(),
  publishAssessmentPackageStatus: setInitalPublishAssessmentPackageStatus()
};

export const assessmentReducer = createReducer(
  initialState,
  on(AssessmentsActions.getTasksListSuccess, (state, action) => ({
    ...state,
    tasksList: action.payload
  })),
  on(AssessmentsActions.getTasksListFailure, (state, action) => ({
    ...state,
    tasksList: {
      ...state.tasksList,
      failureMessage: action.payload
    }
  })),
  on(AssessmentsActions.getPackageList, (state) => ({
    ...state,
    loadMorePackageTemplates: true
  })),
  on(AssessmentsActions.getPackageListSuccess, (state, action) => ({
    ...state,
    loadMorePackageTemplates: false,
    packageList: action.payload
  })),
  on(AssessmentsActions.getPackageListFailure, (state, action) => ({
    ...state,
    packageList: {
      ...state.packageList,
      failureMessage: action.payload
    }
  })),
  on(AssessmentsActions.getPackageDetailsSuccess, (state, action) => ({
    ...state,
    packageDetails: action.payload
  })),
  on(AssessmentsActions.getPackageDetailsFailure, (state, action) => ({
    ...state,
    packageDetails: {
      ...state.packageDetails,
      failureMessage: action.payload
    }
  })),
  on(AssessmentsActions.clearPackageDetailsState, (state) => ({
    ...state,
    packageDetails: setInitalPackageDetailsState()
  })),
  on(AssessmentsActions.loadMorePackageTemplates, (state) => ({
    ...state,
    loadMorePackageTemplates: true
  })),
  on(AssessmentsActions.loadMorePackageTemplatesSuccess, (state, action) => ({
    ...state,
    loadMorePackageTemplates: false,
    packageList: {
      ...state.packageList,
      data: [...state.packageList.data, ...action.payload.data],
      meta: action.payload.meta
    }
  })),
  on(AssessmentsActions.createAssessmentPackageSuccess, (state, action) => ({
    ...state,
    createAssessmentPackage: {
      ...state.createAssessmentPackage,
      packageId: action.payload.data.id,
      snackBarMessage: AssessmentsModuleEnum.SavedAssessmentStatus
    }
  })),
  on(AssessmentsActions.createAssessmentPackageFailure, (state, action) => ({
    ...state,
    createAssessmentPackage: {
      snackBarMessage: AssessmentsModuleEnum.FailedAssessmentStatus,
      failureMessage: action.payload
    }
  })),
  on(AssessmentsActions.resetCreateAsessmentPackageSnackBarMessage, (state, action) => ({
    ...state,
    createAssessmentPackage: {
      ...state.createAssessmentPackage,
      snackBarMessage: action.payload.snackbarMessage
    }
  })),
  on(AssessmentsActions.updateAssessmentPackageSuccess, (state, action) => ({
    ...state,
    createAssessmentPackage: {
      ...state.createAssessmentPackage,
      snackBarMessage: AssessmentsModuleEnum.SavedAssessmentStatus
    }
  })),
  on(AssessmentsActions.updateAssessmentPackageFailure, (state, action) => ({
    ...state,
    createAssessmentPackage: {
      snackBarMessage: AssessmentsModuleEnum.FailedAssessmentStatus,
      failureMessage: action.payload
    }
  })),
  on(AssessmentsActions.clearCreateAssessmentPackageState, (state) => ({
    ...state,
    createAssessmentPackage: createAssessmentPackage()
  })),
  on(AssessmentsActions.clearPublishAssessmentPackageStatus, (state) => ({
    ...state,
    publishAssessmentPackageStatus: setInitalPublishAssessmentPackageStatus()
  })),
  on(AssessmentsActions.publishAssessmentPackageSuccess, (state, action) => ({
    ...state,
    publishAssessmentPackageStatus: {
      success: action.payload.success
    }
  })),
  on(AssessmentsActions.publishAssessmentPackageFailure, (state, action) => ({
    ...state,
    publishAssessmentPackageStatus: {
      success: '',
      failureMessage: {
        error: {
          errors: action.payload.error.errors
        }
      }
    }
  }))
);

export function reducer(state: AssessmentState | undefined, action: Action): AssessmentState {
  return assessmentReducer(state, action);
}

export const selectTasksListState = (state: AssessmentsReducerState) =>
  state.assessmentsModule.assessmentsModuleState.tasksList;
export const selectPackageListState = (state: AssessmentsReducerState) =>
  state.assessmentsModule.assessmentsModuleState.packageList;
export const selectPackageDetailsState = (state: AssessmentsReducerState) =>
  state.assessmentsModule.assessmentsModuleState.packageDetails;
export const selectCreateAssessmentSnackBarMessage = (state: AssessmentsReducerState) =>
  state.assessmentsModule.assessmentsModuleState.createAssessmentPackage.snackBarMessage;
export const selectPackageId = (state: AssessmentsReducerState) =>
  state.assessmentsModule.assessmentsModuleState.createAssessmentPackage.packageId;
export const selectLoadingPackageTemplates = (state: AssessmentsReducerState) =>
  state.assessmentsModule.assessmentsModuleState.loadMorePackageTemplates;
export const selectPublishAssessmentPackageStatus = (state: AssessmentsReducerState) =>
  state.assessmentsModule.assessmentsModuleState.publishAssessmentPackageStatus;
