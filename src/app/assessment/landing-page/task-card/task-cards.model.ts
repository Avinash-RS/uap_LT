export interface TaskCardsModel {
  data: DataModel;
}

export interface DataModel {
  id: number;
  type: string;
  attributes: AttributesModel;
}

export interface AttributesModel {
  userId: string;
  batchId: string;
  packageTemplateId: number;
  sequenceOn: boolean;
  startDateTime: string;
  endDateTime: string;
  level: string;
  assessmentTasks: AssessmentTasksModel[];
}

export interface AssessmentTasksModel {
  id: number;
  taskName: string;
  taskUrl: string;
  status: string;
  startTime: string;
  endTime: string;
  completedTime: string;
  duration: number;
}

export interface AssessmentSummaryModel {
  hour: string;
  tasks: number;
}

export interface HourAndMinuteModel {
  hour: number;
  minute: number;
}

export interface StartTimeModel {
  startOn: string;
  countdown: CountdownModel;
  showCountdown: boolean;
}

export interface CountdownModel {
  leftTime: number;
  format: string;
}
