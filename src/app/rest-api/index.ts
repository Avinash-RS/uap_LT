import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AssessmentAPIService } from './assessments-api/assessments-api.service';
import { PackageAPIService } from './package-api/package-api.service';
import { ReportAPIService } from './report-api/report-api.service';
import { UapHttpService } from './uap-http.service';
import { ScheduleAPIService } from './schedule-api/schedule-api.service';
import { UserAPIService } from './user-api/user-api.service';
import { ReferenceAPIService } from './reference-api/reference-api.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    AssessmentAPIService,
    PackageAPIService,
    ReportAPIService,
    UapHttpService,
    UserAPIService,
    ScheduleAPIService,
    ReferenceAPIService
  ]
})
export class RestApiModule {}
