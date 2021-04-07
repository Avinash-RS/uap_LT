import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UapHttpService } from '../uap-http.service';
import { AssessmentReportResponse } from './models/assessment-report-response.model';
import { AssessmentReportRequest } from './models/assessment-report-request.model';

@Injectable()
export class ReportAPIService {
  constructor(private httpClient: UapHttpService) {}
  getReports(request: AssessmentReportRequest): Observable<Array<AssessmentReportResponse>> {
    return this.httpClient.get<Array<AssessmentReportResponse>>(
      // tslint:disable-next-line:max-line-length
      `reports?batchId=${request.batchId}&userEmailId=${request.userEmailId}&offset=${request.pagination?.offset}&limit=${request.pagination?.limit}`
    );
  }
}
