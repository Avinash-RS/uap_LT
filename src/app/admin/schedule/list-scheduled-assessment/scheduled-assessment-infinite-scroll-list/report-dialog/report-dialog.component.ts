import { Component, AfterViewInit, EventEmitter, Output, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgxPrinterService } from 'ngx-printer';
import { ScheduleUtils } from '../../../schedule.utils';
import { CandidateReportResponseModel } from 'src/app/rest-api/schedule-api/models/candidate-report-response.model';
import { AssessmentAPIService } from 'src/app/rest-api/assessments-api/assessments-api.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-report-dialog',
  templateUrl: 'report-dialog.component.html',
  styleUrls: ['report-dialog.component.scss']
})
export class ReportDoalogComponent implements AfterViewInit, OnInit {
  @Input() assessmentId: string;
  @Output() selectedIndexEvent = new EventEmitter<number>();
  @ViewChild('reference', {static: false}) matDialogRef: TemplateRef<any>;
  constructor(
    private printerService: NgxPrinterService,
    public scheduleUtil: ScheduleUtils,
    private assessmentAPIService: AssessmentAPIService,
    private dialog: MatDialog
  ) {}
  reportResponse: CandidateReportResponseModel;
  ngOnInit(): void {
    this.assessmentAPIService.getReport(this.assessmentId).subscribe((val) => {
      this.reportResponse = val;
      this.openMatDialog();
    });
  }
  ngAfterViewInit(): void {
    // this.dialog.closeAll();
  }

  openPrintOption() {
    this.printerService.printDiv('pdfTable');
  }

  openMatDialog() {
    const dialogRef = this.dialog.open(this.matDialogRef, {
      width: '900px',
      height: 'auto',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: true,
      panelClass: 'reportForm'
    });


  }

  closeDialog(e) {
    this.selectedIndexEvent.emit(-1);
    this.dialog.closeAll();
  }
}
