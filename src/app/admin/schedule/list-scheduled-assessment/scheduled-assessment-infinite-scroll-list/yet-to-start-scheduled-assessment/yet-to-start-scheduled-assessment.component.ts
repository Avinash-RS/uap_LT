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
  getCandidatesAssessments,
  loadMoreCandidatesAssessments,
  getCandidatesAssessmentExport,
  initReinviteAssessment,
  clearReinviteAssessmentState
} from '../../../redux/schedule.actions';
import {
  selectCandidatesAssessment,
  selectCandidatesAssessmentExportList,
  selectReinviteCandidateStatus
} from '../../../redux/schedule.reducers';
import { ScheduleModuleEnum } from '../../../schedule.enums';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorResponse } from 'src/app/rest-api/common/models/error.model';
import { selectCategoryWithMenuOptions } from 'src/app/redux/reference-data/reference-data.reducer';
import {
  CategoryWithMenuOptions,
  SelectMenuOption
} from 'src/app/redux/reference-data/reference-data.model';
@Component({
  selector: 'app-yet-to-start-scheduled-assessment',
  templateUrl: 'yet-to-start-scheduled-assessment.component.html',
  styleUrls: ['yet-to-start-scheduled-assessment.component.scss']
})
export class YetToStartScheduledAssessmentComponent implements OnInit, OnDestroy {
  @Input() selectedbatchId: string;
  @Input() selectedbatchName: string;
  private alive: boolean;
  showSnackBar = false;
  snackBarSuccessMessage: string;
  snackBarFailureMessage: ErrorResponse;
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    useBom: true,
    headers: ['Email Id', 'First Name', 'Last Name', 'Invite Status']
  };
  candidateAssessmentSearchString: string;
  candidatesAssessment: CandidatesAssessmentResponseModel;
  filterValues: FilterValueModel[] = [
    { value: '', viewValue: ScheduleModuleEnum.AllCandidateInviteStatus }
  ];
  selectedFilterValue: string = this.filterValues[0].value;
  selector = '.main-panel-schedule';
  constructor(private store: Store<SchedulerReducerState>, private spinner: NgxSpinnerService) {}
  ngOnInit(): void {
    this.alive = true;
    this.store.select(selectCandidatesAssessment).subscribe((val) => {
      this.candidatesAssessment = val;
    });
    this.store
      .select(selectCategoryWithMenuOptions)
      .subscribe((categoryWithMenuOptions: CategoryWithMenuOptions) => {
        categoryWithMenuOptions.data.forEach((categoryWithMenuOption: SelectMenuOption) => {
          if (categoryWithMenuOption.name === ScheduleModuleEnum.EmailStatus) {
            categoryWithMenuOption.menuOptions.forEach((menuOption) => {
              this.filterValues.push({
                value: menuOption.code,
                viewValue: menuOption.decode
              });
            });
          }
        });
      });
    this.store
      .select(selectCandidatesAssessmentExportList)
      .pipe(takeWhile((_) => this.alive))
      .subscribe((candidatesAssessmentExportList) => {
        if (candidatesAssessmentExportList.data.length) {
          this.exportCsv(candidatesAssessmentExportList.data);
        }
      });
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
  onScroll(): void {
    if (this.candidatesAssessment.meta.nextOffset) {
      this.store.dispatch(
        loadMoreCandidatesAssessments({
          payload: {
            pageMetaData: this.candidatesAssessment.meta,
            searchString: this.candidateAssessmentSearchString
              ? this.candidateAssessmentSearchString
              : '',
            status: this.selectedFilterValue ? this.selectedFilterValue : '',
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
          status: status ? status : '',
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
          status: this.selectedFilterValue ? this.selectedFilterValue : ''
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
        inviteStatus: item.attributes.inviteStatus
      });
    });
    // tslint:disable-next-line: no-unused-expression
    new Angular2Csv(inviteStatus, this.selectedbatchName, this.options);
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
  ngOnDestroy(): void {
    this.alive = false;
  }
  clearReinviteState(): void {
    this.showSnackBar = false;
    this.store.dispatch(clearReinviteAssessmentState());
  }
}
