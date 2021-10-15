// tslint:disable
/**
 * Assessment Task Response Object
 */
export interface AssessmentTaskResponse {
  id: number;
  taskName: string;
  status: string;
  startTime: string;
  endTime: string;
  completedTime: string;
  duration: number;
  taskType: string;
  deliveryId?: string;
  currentDateTime:string;
}
