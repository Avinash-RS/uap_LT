import { ScheduleRequest } from 'src/app/rest-api/schedule-api/models/schedule-assessment-request.model';

export interface CreateSchedulePackageFormModel {
  batchName: string;
  scheduleDescription: string;
  scheduleDate: Date;
  scheduleTime: string;
  scheduleEndDate: Date;
  scheduleEndTime: string;
  assessmentName: string;
  orgId:string
}

export interface CandidateInforamtion {
  emailId: string;
  firstName: string;
  lastName: string;
  instanceId?: string;
}

export interface InitScheduleCreateAssessmentModel {
  data: ScheduleRequest;
}
