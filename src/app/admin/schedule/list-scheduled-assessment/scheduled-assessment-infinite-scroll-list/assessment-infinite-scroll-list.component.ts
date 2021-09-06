import { AssesmentsUtil } from './../../../assessments/assessments.common.utils';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CandidatesAssessmentResponseModel } from 'src/app/rest-api/schedule-api/models/candidates-assessment-response.model';
import {
  MetaDataModel,
  ScheduledAssessmentModel
} from 'src/app/rest-api/schedule-api/models/scheduled-assessments-response.model';
import { SchedulerReducerState, FilterValueModel } from '../../redux/schedule.model';
import {
  loadMoreScheduledAssessment,
  getCandidatesAssessments,
  clearCandidatesAssessmentExportData
} from '../../redux/schedule.actions';
import { Store } from '@ngrx/store';
import { selectCandidatesAssessment } from '../../redux/schedule.reducers';
import { ScheduleModuleEnum } from '../../schedule.enums';
import { ScheduleUtils } from '../../schedule.utils';
import { selectUserProfileData } from 'src/app/redux/user/user.reducer';

@Component({
  selector: 'app-scheduled-infinite-scroll-list',
  templateUrl: 'assessment-infinite-scroll-list.component.html',
  styleUrls: ['assessment-infinite-scroll-list.component.scss']
})
export class ScheduledInfiniteScrollListComponent implements OnInit {
  @Input() scheduledTemplates: ScheduledAssessmentModel[];
  @Input() pageMetadata: MetaDataModel;
  @Input() searchString: string;
  @Input() status: string;
  @Input() showLazyLoading: boolean;
  @Input() selectedIndex: number;
  @Output() selectedIndexEvent = new EventEmitter<number>();
  candidateAssessmentSearchString: string;
  selector = '.main-panel-schedule-assessment';
  selectedbatchId: string;
  selectedbatchName: string;
  canViewSchedule = false;
  filterValues: FilterValueModel[] = [
    { value: '', viewValue: ScheduleModuleEnum.AllCandidateInviteStatus },
    {
      value: ScheduleModuleEnum.DeliveredCandidateInviteStatus,
      viewValue: ScheduleModuleEnum.DeliveredCandidateInviteStatus
    },
    {
      value: ScheduleModuleEnum.FailedCandidateInviteStatus,
      viewValue: ScheduleModuleEnum.FailedCandidateInviteStatus
    }
  ];
  selectedFilterValue: string = this.filterValues[0].value;
  candidatesAssessment: CandidatesAssessmentResponseModel;
  constructor(private store: Store<SchedulerReducerState>, public scheduleUtil: ScheduleUtils, public assesmentsUtil: AssesmentsUtil) {}
  ngOnInit(): void {
    this.checkScheduleAccessStatus();
    this.store.select(selectCandidatesAssessment).subscribe((val) => {
      this.candidatesAssessment = val;
    });
  }
  onScroll(): void {
    if (this.pageMetadata.nextOffset) {
      this.store.dispatch(
        loadMoreScheduledAssessment({
          payload: {
            pageMetaData: this.pageMetadata,
            searchString: this.searchString ? this.searchString : '',
            status: this.status ? this.status : ''
          }
        })
      );
    }
  }
  onHideDeatils(): void {
    this.selectedIndexEvent.emit(-1);
    this.store.dispatch(clearCandidatesAssessmentExportData());
  }
  onViewDeatils(index: number): void {
    this.selectedbatchId = this.scheduledTemplates[index].id;
    this.selectedbatchName = this.scheduledTemplates[index].attributes.batchName;
    console.log('coming', index);
    
    this.store.dispatch(
      getCandidatesAssessments({
        payload: {
          pageMetaData: {
            limit: 5,
            nextOffset: 0,
            offset: 0
          },
          searchString: '',
          status: '',
          batchId: this.selectedbatchId
        }
      })
    );
    this.selectedIndexEvent.emit(index);
    this.store.dispatch(clearCandidatesAssessmentExportData());
  }

  checkScheduleAccessStatus(): void {
    this.store.select(selectUserProfileData).subscribe((profileResponse) => {
      profileResponse.attributes.organisations.forEach((organisations) => {
        organisations.roles.forEach((roles) => {
          roles.permissions.forEach((permissions) => {
            if (permissions.code === 'VSH') {
              this.canViewSchedule = true;
            }
          });
        });
      });
    });
  }
}
