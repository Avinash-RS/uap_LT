import { Component, OnInit } from '@angular/core';
import { ScheduledAssessmentResponseModel } from 'src/app/rest-api/schedule-api/models/scheduled-assessments-response.model';
import { AssessmentsModuleEnum } from '../../assessments/assessments.enums';
import { Store } from '@ngrx/store';
import { SchedulerReducerState, FilterValueModel } from '../redux/schedule.model';
import { getScheduledAssessment } from '../redux/schedule.actions';
import {
  selectScheduledAssessMentsState,
  selectLoadingScheduledAssessment
} from '../redux/schedule.reducers';
import { selectCategoryWithMenuOptions } from 'src/app/redux/reference-data/reference-data.reducer';
import {
  CategoryWithMenuOptions,
  SelectMenuOption
} from 'src/app/redux/reference-data/reference-data.model';
import { ScheduleModuleEnum } from '../schedule.enums';

@Component({
  selector: 'app-list-scheduled-assessment',
  templateUrl: 'list-scheduled-assessment.component.html',
  styleUrls: ['list-scheduled-assessment.component.scss']
})
export class ListScheduledAssessmentComponent implements OnInit {
  searchString: string;
  showLazyLoading: boolean;
  selectedIndex: number;
  filterValues: FilterValueModel[] = [
    { value: '', viewValue: AssessmentsModuleEnum.AllAssessmentStatus }
  ];
  selectedFilterValue: string = this.filterValues[0].value;
  scheduleAssessmentContent: ScheduledAssessmentResponseModel;
  constructor(private store: Store<SchedulerReducerState>) {}
  ngOnInit(): void {
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

    this.dispatchGetScheduledAssessment('', '');
    this.store.select(selectScheduledAssessMentsState).subscribe((val) => {
      this.scheduleAssessmentContent = val;
      this.selectedIndex = -1;
    });
    this.store.select(selectLoadingScheduledAssessment).subscribe((val) => {
      this.showLazyLoading = val;
    });
  }
  onSearch(searchString: string): void {
    this.searchString = searchString;
    this.dispatchGetScheduledAssessment(this.searchString, this.selectedFilterValue);
  }
  onFilterValueChange(filterValue: string): void {
    this.dispatchGetScheduledAssessment(this.searchString, filterValue);
  }
  selectedIndexEvent(index: number): void {
    this.selectedIndex = index;
  }
  dispatchGetScheduledAssessment(searchString: string, status: string): void {
    this.store.dispatch(
      getScheduledAssessment({
        payload: {
          pageMetaData: {
            limit: 30,
            nextOffset: 0,
            offset: 0
          },
          searchString: searchString ? searchString : '',
          status: status ? status : ''
        }
      })
    );
  }
}
