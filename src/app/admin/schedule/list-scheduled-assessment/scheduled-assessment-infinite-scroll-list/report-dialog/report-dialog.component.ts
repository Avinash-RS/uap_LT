import { Component, AfterViewInit, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { NgxPrinterService } from 'ngx-printer';
import { ScheduleUtils } from '../../../schedule.utils';
import { CandidateReportResponseModel } from 'src/app/rest-api/schedule-api/models/candidate-report-response.model';
import { AssessmentAPIService } from 'src/app/rest-api/assessments-api/assessments-api.service';

@Component({
  selector: 'app-report-dialog',
  templateUrl: 'report-dialog.component.html',
  styleUrls: ['report-dialog.component.scss']
})
export class ReportDoalogComponent implements AfterViewInit, OnInit {
  @Input() assessmentId: string;
  @Output() selectedIndexEvent = new EventEmitter<number>();
  constructor(
    private printerService: NgxPrinterService,
    public scheduleUtil: ScheduleUtils,
    private assessmentAPIService: AssessmentAPIService
  ) {}
  reportResponse: CandidateReportResponseModel;
  ngOnInit(): void {
    this.assessmentAPIService.getReport(this.assessmentId).subscribe((val) => {
      this.reportResponse = val;
    });
  }
  ngAfterViewInit(): void {
    this.printerService.printDiv('pdfTable');
    this.selectedIndexEvent.emit(-1);
  }
}
