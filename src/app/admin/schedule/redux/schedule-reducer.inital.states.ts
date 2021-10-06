import { ErrorResponse } from 'src/app/rest-api/common/models/error.model';
import { ScheduleModuleEnum } from '../schedule.enums';
import { CandidatesAssessmentsModel } from 'src/app/rest-api/schedule-api/models/candidates-assessment-response.model';
import { CandidateReportResponseModel } from 'src/app/rest-api/schedule-api/models/candidate-report-response.model';
import { ReInviteCandidateAssessmentStatusModel } from './schedule.model';

export let scheduleAssessmentPackage = (): ScheduleAssesmentPackage => {
  return {
    packageId: '',
    snackBarMessage: ScheduleModuleEnum.CreatingScheduleAssessmentStatus,
    failureMessage: {
      error: {
        errors: []
      }
    }
  };
};

export let updateScheduleAssessmentPackage = (): ScheduleAssesmentPackage => {
  return {
    packageId: '',
    failureMessage: {
      error: {
        errors: []
      }
    }
  };
};

export let setInitialCandidatesAssessmentExportState = (): CandidatesAssessmentsModel => {
  return {
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
  };
};

export let setInitalReinviteAssessmentStatus = (): ReInviteCandidateAssessmentStatusModel => {
  return {
    success: '',
    failureMessage: {
      error: {
        errors: []
      }
    }
  };
};

export let setInitialCandidateReportState = (): CandidateReportResponseModel => {
  return {
    data: {
      id: '',
      type: '',
      attributes: {
        id: 0,
        assessmentId: '',
        startTime: '',
        endTime: '',
        completedTime: '',
        status: '',
        consolidatedScore: 0,
        batchName: '',

        userDetails: {
          firstName: '',
          lastName: '',
          email: ''
        },
        taskResults: []
      }
    },
    failureMessage: {
      error: {
        errors: []
      }
    }
  };
};

export interface ScheduleAssesmentPackage {
  packageId?: string;
  snackBarMessage?: string;
  failureMessage?: ErrorResponse;
}
