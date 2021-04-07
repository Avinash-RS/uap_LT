import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  CandidatesAssessmentResponseModel,
  CandidatesAssessmentModel
} from 'src/app/rest-api/schedule-api/models/candidates-assessment-response.model';
import { SchedulerReducerState, ExportAttributeModel } from '../../../redux/schedule.model';
import { Store } from '@ngrx/store';
import {
  selectCandidatesAssessment,
  selectCandidatesAssessmentExportList,
  selectCandidateReport
} from '../../../redux/schedule.reducers';
import {
  loadMoreCandidatesAssessments,
  getCandidatesAssessments,
  getCandidatesAssessmentExport,
  // getCandidateReport,
  clearCandidatesReportData
} from '../../../redux/schedule.actions';
import { takeWhile } from 'rxjs/operators';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
// import { CandidateReportResponseModel } from 'src/app/rest-api/schedule-api/models/candidate-report-response.model';

@Component({
  selector: 'app-completed-scheduled-assessment',
  templateUrl: 'completed-scheduled-assessment.component.html',
  styleUrls: ['completed-scheduled-assessment.component.scss']
})
export class CompletedScheduledAssessmentComponent implements OnInit, OnDestroy {
  selector = '.main-panel-schedule';
  @Input() selectedbatchId: string;
  candidateAssessmentSearchString: string;
  candidatesAssessment: CandidatesAssessmentResponseModel;
  // reportResponse: CandidateReportResponseModel;
  @Input() selectedbatchName: string;
  private alive: boolean;
  selectedIndex = -1;
  // showReport = false;
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    useBom: true,
    headers: [
      'Email Id',
      'First Name',
      'Last Name',
      'Invite Status',
      'Assessment Status',
      'Test Completion',
      'Score(%)'
    ]
  };
  constructor(private store: Store<SchedulerReducerState>) {}
  ngOnInit(): void {
    this.alive = true;
    this.store.select(selectCandidatesAssessment).subscribe((val) => {
      this.candidatesAssessment = val;
    });
    this.store
      .select(selectCandidatesAssessmentExportList)
      .pipe(takeWhile((_) => this.alive))
      .subscribe((candidatesAssessmentExportList) => {
        if (candidatesAssessmentExportList.data.length) {
          this.exportCsv(candidatesAssessmentExportList.data);
        }
      });
    // this.store.select(selectCandidateReport).subscribe((candidateReport) => {
    //   if (candidateReport.data.id.length) {
    //     this.showReport = true;
    //     this.reportResponse = candidateReport;
    //   }
    // });
  }
  onScroll(): void {
    if (this.candidatesAssessment.meta.nextOffset) {
      this.store.dispatch(
        loadMoreCandidatesAssessments({
          payload: {
            pageMetaData: this.candidatesAssessment.meta,
            searchString: this.candidateAssessmentSearchString
              ? this.candidateAssessmentSearchString
              : '',
            batchId: this.selectedbatchId
          }
        })
      );
    }
  }
  onSearch(searchString: string): void {
    this.candidateAssessmentSearchString = searchString;
    this.store.dispatch(
      getCandidatesAssessments({
        payload: {
          pageMetaData: {
            limit: 30,
            nextOffset: 0,
            offset: 0
          },
          searchString: searchString ? searchString : '',
          batchId: this.selectedbatchId
        }
      })
    );
  }
  downloadCSV(): void {
    this.store.dispatch(
      getCandidatesAssessmentExport({
        payload: {
          batchId: this.selectedbatchId,
          searchString: this.candidateAssessmentSearchString
            ? this.candidateAssessmentSearchString
            : ''
        }
      })
    );
  }
  exportCsv(data: CandidatesAssessmentModel[]): void {
    const inviteStatus: ExportAttributeModel[] = [];
    data.forEach((item: CandidatesAssessmentModel) => {
      inviteStatus.push({
        emailId: item.attributes.emailId,
        firstName: item.attributes.firstName,
        lastName: item.attributes.lastName,
        inviteStatus: item.attributes.inviteStatus,
        assessmentStatus: item.attributes.assessmentStatus,
        testCompletion:
          item.attributes.completedTaskCount + ' out of ' + item.attributes.totalTaskCount,
        averageScore:
          item.attributes.averageScore !== null ? `${item.attributes.averageScore.toFixed(2)}` : ''
      });
    });
    // tslint:disable-next-line: no-unused-expression
    new Angular2Csv(inviteStatus, this.selectedbatchName, this.options);
  }
  printReport(index: number): void {
    if (this.selectedIndex === index) {
      this.selectedIndex = -1;
    } else {
      this.selectedIndex = index;
    }
    // this.store.dispatch(
    //   getCandidateReport({
    //     payload: {
    //       assessmentId
    //     }
    //   })
    // );
  }
  selectedIndexEvent(index: number): void {
    this.selectedIndex = index;
    // this.showReport = false;
    // this.store.dispatch(clearCandidatesReportData());
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
