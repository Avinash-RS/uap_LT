import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  CandidatesAssessmentResponseModel,
  CandidatesAssessmentModel
} from 'src/app/rest-api/schedule-api/models/candidates-assessment-response.model';
import {
  SchedulerReducerState,
  FilterValueModel,
  ExportAttributeModel,
  ReInviteCandidateAssessmentStatusModel
} from '../../../redux/schedule.model';
import { Store } from '@ngrx/store';
import {
  selectCandidatesAssessment,
  selectCandidatesAssessmentExportList,
  // selectCandidateReport,
  selectReinviteCandidateStatus
} from '../../../redux/schedule.reducers';
import {
  loadMoreCandidatesAssessments,
  getCandidatesAssessments,
  getCandidatesAssessmentExport,
  clearCandidatesReportData,
  // getCandidateReport,
  initReinviteAssessment,
  clearReinviteAssessmentState
} from '../../../redux/schedule.actions';
import { AssessmentsModuleEnum } from 'src/app/admin/assessments/assessments.enums';
import { takeWhile } from 'rxjs/operators';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
// import { CandidateReportResponseModel } from 'src/app/rest-api/schedule-api/models/candidate-report-response.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorResponse } from 'src/app/rest-api/common/models/error.model';
import { selectCategoryWithMenuOptions } from 'src/app/redux/reference-data/reference-data.reducer';
import {
  CategoryWithMenuOptions,
  SelectMenuOption
} from 'src/app/redux/reference-data/reference-data.model';
import { ScheduleModuleEnum } from '../../../schedule.enums';

@Component({
  selector: 'app-in-progress-scheduled-assessment',
  templateUrl: 'in-progress-scheduled-assessment.component.html',
  styleUrls: ['in-progress-scheduled-assessment.component.scss']
})
export class InProgressScheduledAssessmentComponent implements OnInit, OnDestroy {
  selector = '.main-panel-schedule';
  @Input() selectedbatchName: string;
  showSnackBar = false;
  snackBarSuccessMessage: string;
  snackBarFailureMessage: ErrorResponse;
  // showReport = false;
  selectedIndex = -1;
  // reportResponse: CandidateReportResponseModel;
  private alive: boolean;
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
  @Input() selectedbatchId: string;
  candidateAssessmentSearchString: string;
  candidatesAssessment: CandidatesAssessmentResponseModel;
  filterValues: FilterValueModel[] = [
    { value: '', viewValue: AssessmentsModuleEnum.AllAssessmentStatus }
  ];
  selectedFilterValue: string = this.filterValues[0].value;
  constructor(private store: Store<SchedulerReducerState>, private spinner: NgxSpinnerService) {}
  ngOnInit(): void {
    this.alive = true;
    this.store
      .select(selectCategoryWithMenuOptions)
      .subscribe((categoryWithMenuOptions: CategoryWithMenuOptions) => {
        categoryWithMenuOptions.data.forEach((categoryWithMenuOption: SelectMenuOption) => {
          if (categoryWithMenuOption.name === ScheduleModuleEnum.ScheduleStatus) {
            categoryWithMenuOption.menuOptions.forEach((menuOption) => {
              this.filterValues.push({
                value: menuOption.code,
                viewValue: menuOption.decode
              });
            });
          }
        });
      });
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
    this.store
      .select(selectReinviteCandidateStatus)
      .pipe(takeWhile((_) => this.alive))
      .subscribe((reinviteCandidateStatus: ReInviteCandidateAssessmentStatusModel) => {
        if (reinviteCandidateStatus.success.length) {
          this.showSnackBarAndHideSpinner();
          this.snackBarSuccessMessage = reinviteCandidateStatus.success;
        }
        if (reinviteCandidateStatus.failureMessage?.error.errors.length) {
          this.showSnackBarAndHideSpinner();
          this.snackBarFailureMessage = reinviteCandidateStatus.failureMessage;
        }
      });
  }
  showSnackBarAndHideSpinner(): void {
    this.spinner.hide();
    this.showSnackBar = true;
  }
  reInviteCandidate(selectedCandidateIndex: number): void {
    this.spinner.show();
    this.store.dispatch(
      initReinviteAssessment({
        payload: {
          packageTemplateId: this.candidatesAssessment.data[selectedCandidateIndex].id
        }
      })
    );
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
            assessmentStatus: this.selectedFilterValue ? this.selectedFilterValue : '',
            batchId: this.selectedbatchId
          }
        })
      );
    }
  }
  onSearch(searchString: string): void {
    this.candidateAssessmentSearchString = searchString;
    this.dispatchGetCandidatesAssessments(searchString, this.selectedFilterValue);
  }
  onFilterValueChange(filterValue: string): void {
    this.dispatchGetCandidatesAssessments(this.candidateAssessmentSearchString, filterValue);
  }
  dispatchGetCandidatesAssessments(searchString: string, status: string): void {
    this.store.dispatch(
      getCandidatesAssessments({
        payload: {
          pageMetaData: {
            limit: 30,
            nextOffset: 0,
            offset: 0
          },
          searchString: searchString ? searchString : '',
          assessmentStatus: status ? status : '',
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
            : '',
          assessmentStatus: this.selectedFilterValue ? this.selectedFilterValue : ''
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
  clearReinviteState(): void {
    this.showSnackBar = false;
    this.store.dispatch(clearReinviteAssessmentState());
  }
  ngOnDestroy(): void {
    this.alive = false;
  }
}
