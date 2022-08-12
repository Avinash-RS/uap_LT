import { CandidateInforamtion } from 'src/app/admin/schedule/create-schedule-package/create-schedule-package.model';

/**
 * Schedule Request Attributes
 */
export interface ScheduleRequestDataAttributes {
  /**
   * Schedule/Batch Description
   */
  description: string;
  /**
   * Unique id of package template used to create this assessment
   */
  packageTemplateId: number;
  /**
   * Unique batch name to group individual assessments
   */
  batchName?: string;
  /**
   * Overall Start Date Time. In UTC
   */
  startDateTime: string;
  /**
   * Overall End Date Time.In UTC
   */
  endDateTime?: string;
  /**
   * Overall duration of Assessment. Sum of duration of each task
   */
  duration: number;
  /**
   * Scheduled At Test Level. Future Release
   */
  scheduledAtTestLevel: boolean;
  /**
   * List of Canidates to be invited
   */
  orgId?:string;
  orgName?:string;
  templateId?:string;
  tempname?:string;
  supportEmail?:string;
  supportPhone?:string;
  candidateDetails: Array<object>;
  testDetails: Array<object>;
  is_published:string;
  publishDate:string;
  send_Notification : string;
  assessmentCode:string;
  // publishTime:string
}

export interface ScheduleRequestData {
  type?: string;
  attributes: ScheduleRequestDataAttributes;
}

export interface ScheduleRequest {
  data: ScheduleRequestData;
}

export interface CreateSchedulePackageResponse {
  data: SchedulePackageResponseData;
  success?: string;
  message?:string;
}

export interface SchedulePackageResponseData {
  id: string;
  type: string;
}
