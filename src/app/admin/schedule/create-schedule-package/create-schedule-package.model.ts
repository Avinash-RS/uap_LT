import { ScheduleRequest } from 'src/app/rest-api/schedule-api/models/schedule-assessment-request.model';

export interface CreateSchedulePackageFormModel {
  batchName: string;
  scheduleDescription: string;
  scheduleDate: Date;
  scheduleTime: string;
  assessmentName: string;
}

export interface CandidateInforamtion {
  emailId: string;
  firstName: string;
  lastName: string;
}

export interface InitScheduleCreateAssessmentModel {
  data: ScheduleRequest;
}
