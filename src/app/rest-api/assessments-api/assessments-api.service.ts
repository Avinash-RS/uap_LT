import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssessmentReportResponse } from '../report-api/models/assessment-report-response.model';

import { UapHttpService } from '../uap-http.service';
import { AssessmentResponse, AssessmentTaskModel } from './models/assessment-response.model';
import { CreateAssessmentRequest } from './models/create-assessment-request.model';
import { AssessmentRequest } from './models/assessment-request.model';
import { UpdateAssessmentRequest } from './models/update-assessment-request.model';
import { AssessmentTaskUrlModel } from './models/assessment-task-url-response-model';
import { CandidateReportResponseModel } from '../schedule-api/models/candidate-report-response.model';

@Injectable()
export class AssessmentAPIService {
  constructor(private httpClient: UapHttpService) {}
  getAssessments(request: AssessmentRequest): Observable<Array<AssessmentResponse>> {
    return this.httpClient.get<Array<AssessmentResponse>>(
      // tslint:disable-next-line:max-line-length
      `assessments?userEmailIds=${request.userEmailIds}&offset=${request.pagination?.offset}&limit=${request.pagination?.limit}`
    );
  }

  getAssessment(assessmentId: string,loginId:any): Observable<AssessmentTaskModel> {
    return this.httpClient.post<AssessmentTaskModel>(`/assessments/${assessmentId}`,{loginId:loginId});
  }

  getStatus(request: any) {
    return this.httpClient.post<any>(`/taskStatusUpdate`, request);
  }

  createAssessment(request: CreateAssessmentRequest): Observable<any> {
    return this.httpClient.post<any>(`/assessments`, request);
  }

  updateAssessment(assessmentId: string, updateData: UpdateAssessmentRequest): Observable<any> {
    return this.httpClient.put<any>(`/assessments/${assessmentId}`, updateData);
  }

  getReport(assessmentId: string): Observable<CandidateReportResponseModel> {
    return this.httpClient.get<CandidateReportResponseModel>(`/assessments/${assessmentId}/report`);
  }

  getAssessmentTaskUrl(assessmentId: string, taskId: number,loginId:any): Observable<AssessmentTaskUrlModel> {
    return this.httpClient.post<AssessmentTaskUrlModel>(`/assessments/${assessmentId}/tasks/${taskId}/start`,{loginId:loginId}
    );
  }

  reInviteAssessment(assessmentId: string): Observable<any> {
    return this.httpClient.post<any>(
      `/assessments/${assessmentId}/reinvite`,
      ''
    );
  }


  updateScheduleEndDate(request:any){
    return this.httpClient.post(`/updateScheduleEndtime`, request);
  }


  getTestInformation(request:any){
    return this.httpClient.post(`/scheduledQuestionDetails`, request);
  }

  submitTestDetails(request:any){
    return this.httpClient.post(`/actionLog`, request);
  }

  questionupload(request:any){
    return this.httpClient.post(`/questionMasterExcelUpload`, request);
  }

}
