// Define Schedule Module Enums below

export enum ScheduleModuleEnum {
  AllCandidateInviteStatus = 'All',
  DeliveredCandidateInviteStatus = 'delivered',
  FailedCandidateInviteStatus = 'failed',
  CreatingScheduleAssessmentStatus = 'Scheduling For New Assessment...',
  CreatedScheduleAssessmentStatus = 'New Schedule Created For Assessment',
  FailedScheduleAssessmentStatus = 'End Date and Time should be greater than test duration',
  CsvUpload = 'csv',
  CustomUpload = 'custom',
  EmailStatus = 'EmailStatus',
  ScheduleStatus = 'ScheduleStatus'
}
