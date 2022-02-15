import { Action, createReducer, on } from '@ngrx/store';
import { SchedulerReducerState, ScheduleState } from './schedule.model';
import * as ScheduleActions from './schedule.actions';
import { setInitalPackageDetailsState } from '../../assessments/redux/assessments-reducer.inital.states';
import {
  scheduleAssessmentPackage,
  setInitialCandidatesAssessmentExportState,
  setInitialCandidateReportState,
  setInitalReinviteAssessmentStatus
} from './schedule-reducer.inital.states';
import { ScheduleModuleEnum } from '../schedule.enums';
const initialState: ScheduleState = {
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
  scheduledAssessmentList: {
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
  candidatesAssessmentsList: {
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
  candidatesAssessmentExportList: setInitialCandidatesAssessmentExportState(),
  loadMoreScheduledAssessment: false,
  loadMoreCandidatesAssessments: false,
  packageDetails: setInitalPackageDetailsState(),
  createScheduleAssessmentPackage: scheduleAssessmentPackage(),
  CandidateReportState: setInitialCandidateReportState(),
  reInviteCandidateAssessmentStatus: setInitalReinviteAssessmentStatus()
};

export const scheduleReducer = createReducer(
  initialState,
  on(ScheduleActions.getPackageList, (state) => ({
    ...state,
    loadMorePackageTemplates: true
  })),
  on(ScheduleActions.getPackageListSuccess, (state, action) => ({
    ...state,
    loadMorePackageTemplates: false,
    packageList: action.payload
  })),
  on(ScheduleActions.getPackageListFailure, (state, action) => ({
    ...state,
    packageList: {
      ...state.packageList,
      failureMessage: action.payload
    }
  })),
  on(ScheduleActions.getPackageDetailsSuccess, (state, action) => ({
    ...state,
    packageDetails: action.payload
  })),
  on(ScheduleActions.getPackageDetailsFailure, (state, action) => ({
    ...state,
    packageDetails: {
      ...state.packageDetails,
      failureMessage: action.payload
    }
  })),
  on(ScheduleActions.clearPackageDetailsState, (state) => ({
    ...state,
    packageDetails: setInitalPackageDetailsState()
  })),
  on(ScheduleActions.getScheduledAssessment, (state) => ({
    ...state,
    loadMoreScheduledAssessment: true
  })),
  on(ScheduleActions.getScheduledAssessmentSuccess, (state, action) => ({
    ...state,
    loadMoreScheduledAssessment: false,
    scheduledAssessmentList: action.payload
  })),
  on(ScheduleActions.getScheduledAssessmentFailure, (state, action) => ({
    ...state,
    scheduledAssessmentList: {
      ...state.scheduledAssessmentList,
      failureMessage: {
        error: {
          errors: action.payload.errors
        }
      }
    }
  })),
  on(ScheduleActions.loadMoreScheduledAssessment, (state) => ({
    ...state,
    loadMoreScheduledAssessment: true
  })),
  on(ScheduleActions.loadMoreScheduledAssessmentSuccess, (state, action) => ({
    ...state,
    loadMoreScheduledAssessment: false,
    scheduledAssessmentList: {
      ...state.scheduledAssessmentList,
      data: [...state.scheduledAssessmentList.data, ...action.payload.data],
      meta: action.payload.meta
    }
  })),
  on(ScheduleActions.getCandidatesAssessments, (state) => ({
    ...state,
    loadMoreCandidatesAssessments: true
  })),
  on(ScheduleActions.getCandidatesAssessmentsSuccess, (state, action) => ({
    ...state,
    loadMoreCandidatesAssessments: false,
    candidatesAssessmentsList: action.payload
  })),
  on(ScheduleActions.getCandidatesAssessmentsFailure, (state, action) => ({
    ...state,
    candidatesAssessmentsList: {
      ...state.candidatesAssessmentsList,
      failureMessage: {
        error: {
          errors: action.payload.errors
        }
      }
    }
  })),
  on(ScheduleActions.loadMoreCandidatesAssessments, (state) => ({
    ...state,
    loadMoreCandidatesAssessments: true
  })),
  on(ScheduleActions.loadMoreCandidatesAssessmentsSuccess, (state, action) => ({
    ...state,
    loadMoreCandidatesAssessments: false,
    candidatesAssessmentsList: {
      ...state.candidatesAssessmentsList,
      data: [...state.candidatesAssessmentsList.data, ...action.payload.data],
      meta: action.payload.meta
    }
  })),
  on(ScheduleActions.createScheduleAssessmentPackageSuccess, (state, action) => ({
    ...state,
    createScheduleAssessmentPackage: {
      ...state.createScheduleAssessmentPackage,
      packageId: action.payload.data.id,
      snackBarMessage: ScheduleModuleEnum.CreatedScheduleAssessmentStatus
    }
  })),
  // on(ScheduleActions.createScheduleAssessmentPackageFailure, (state, action) => ({
  //   ...state,
  //   createScheduleAssessmentPackage: {
  //     snackBarMessage: ScheduleModuleEnum.FailedScheduleAssessmentStatus,
  //     failureMessage: action.payload
  //   }
  // })),
  on(ScheduleActions.createScheduleAssessmentPackageFailure, (state, action: any) => {
    if (action.payload.error.errors[0].includes('Published Date and Time')) {
        return { 
        ...state,
        createScheduleAssessmentPackage: {
          snackBarMessage: action.payload.error.errors[0],
          failureMessage: action.payload
        }
      }    
    } else {
      return { 
        ...state,
        createScheduleAssessmentPackage: {
          snackBarMessage: ScheduleModuleEnum.FailedScheduleAssessmentStatus,
          failureMessage: action.payload
        }
      }    
    }
  }),
  on(ScheduleActions.resetCreateScheduleAsessmentPackageSnackBarMessage, (state, action) => ({
    ...state,
    createScheduleAssessmentPackage: {
      ...state.createScheduleAssessmentPackage,
      snackBarMessage: action.payload.snackbarMessage,
      failureMessage: {
        error: {
          errors: []
        }
      }
    }
  })),
  on(ScheduleActions.getCandidatesAssessmentExportSuccess, (state, action) => ({
    ...state,
    candidatesAssessmentExportList: action.payload
  })),
  on(ScheduleActions.clearCandidatesAssessmentExportData, (state) => ({
    ...state,
    candidatesAssessmentExportList: setInitialCandidatesAssessmentExportState()
  })),
  on(ScheduleActions.reinviteAssessmentFailure, (state, action) => ({
    ...state,
    reInviteCandidateAssessmentStatus: {
      success: '',
      failureMessage: action.payload
    }
  })),
  on(ScheduleActions.reinviteAssessmentSuccess, (state, action) => ({
    ...state,
    reInviteCandidateAssessmentStatus: {
      success: action.payload.success
    }
  })),
  on(ScheduleActions.clearReinviteAssessmentState, (state) => ({
    ...state,
    reInviteCandidateAssessmentStatus: setInitalReinviteAssessmentStatus()
  })),
  on(ScheduleActions.getCandidateReportSuccess, (state, action) => ({
    ...state,
    CandidateReportState: action.payload
  })),
  on(ScheduleActions.getCandidateReportFailure, (state, action) => ({
    ...state,
    CandidateReportState: {
      ...state.CandidateReportState,
      failureMessage: action.payload
    }
  })),
  on(ScheduleActions.clearCandidatesReportData, (state) => ({
    ...state,
    CandidateReportState: setInitialCandidateReportState()
  }))
);

export function reducer(state: ScheduleState | undefined, action: Action): ScheduleState {
  return scheduleReducer(state, action);
}

export const selectPackageListState = (state: SchedulerReducerState) =>
  state.scheduleAssessmentModule.scheduleAssessmentModuleState.packageList;
export const selectPackageDetailsState = (state: SchedulerReducerState) =>
  state.scheduleAssessmentModule.scheduleAssessmentModuleState.packageDetails;
export const selectScheduledAssessMentsState = (state: SchedulerReducerState) =>
  state.scheduleAssessmentModule.scheduleAssessmentModuleState.scheduledAssessmentList;
export const selectLoadingScheduledAssessment = (state: SchedulerReducerState) =>
  state.scheduleAssessmentModule.scheduleAssessmentModuleState.loadMoreScheduledAssessment;
export const selectCandidatesAssessment = (state: SchedulerReducerState) =>
  state.scheduleAssessmentModule.scheduleAssessmentModuleState.candidatesAssessmentsList;
export const selectCreateScheduleAssessmentSnackBarMessage = (state: SchedulerReducerState) =>
  state.scheduleAssessmentModule.scheduleAssessmentModuleState.createScheduleAssessmentPackage
    .snackBarMessage;
export const selectCandidatesAssessmentExportList = (state: SchedulerReducerState) =>
  state.scheduleAssessmentModule.scheduleAssessmentModuleState.candidatesAssessmentExportList;
export const selectCandidateReport = (state: SchedulerReducerState) =>
  state.scheduleAssessmentModule.scheduleAssessmentModuleState.CandidateReportState;
export const selectReinviteCandidateStatus = (state: SchedulerReducerState) =>
  state.scheduleAssessmentModule.scheduleAssessmentModuleState.reInviteCandidateAssessmentStatus;
