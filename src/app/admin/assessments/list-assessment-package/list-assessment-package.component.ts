import { Component, OnInit } from '@angular/core';
import { AssessmentsReducerState } from '../redux/assessments.model';
import { Store } from '@ngrx/store';
import * as assessmentActions from '../redux/assessments.actions';
import {
  selectPackageListState,
  selectLoadingPackageTemplates
} from '../redux/assessments.reducers';
import { PackageResponse } from 'src/app/rest-api/package-api/model/package-response.model';
import { AssessmentsModuleEnum } from '../assessments.enums';
import {
  CategoryWithMenuOptions,
  SelectMenuOption
} from 'src/app/redux/reference-data/reference-data.model';
import { selectCategoryWithMenuOptions } from 'src/app/redux/reference-data/reference-data.reducer';
import { selectUserProfileData } from 'src/app/redux/user/user.reducer';
interface FilterValueModel {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-list-assessment-package',
  templateUrl: 'list-assessment-package.component.html',
  styleUrls: ['list-assessment-package.component.scss']
})
export class ListAssessmentPackageComponent implements OnInit {
  packageContents: PackageResponse;
  searchString = '';
  filterValues: FilterValueModel[] = [
    { value: 'All', viewValue: AssessmentsModuleEnum.AllAssessmentStatus }
  ];
  selectedFilterValue: string = this.filterValues[0].value;
  showLazyLoading: boolean;
  canViewPackage = false;

  constructor(private store: Store<AssessmentsReducerState>) {}
  ngOnInit(): void {
    this.checkViewPackageStatus();
    this.store
      .select(selectCategoryWithMenuOptions)
      .subscribe((categoryWithMenuOptions: CategoryWithMenuOptions) => {
        categoryWithMenuOptions.data.forEach((categoryWithMenuOption: SelectMenuOption) => {
          if (categoryWithMenuOption.name === AssessmentsModuleEnum.PackageStatus) {
            categoryWithMenuOption.menuOptions.forEach((menuOption) => {
              this.filterValues.push({
                value: menuOption.code,
                viewValue: menuOption.decode
              });
            });
          }
        });
      });
    this.store.dispatch(
      assessmentActions.getPackageList({
        payload: {
          pageMetaData: {
            limit: 30,
            nextOffset: 0,
            offset: 0
          },
          searchString: '',
          status: ''
        }
      })
    );
    this.store
      .select(selectPackageListState)
      .subscribe((packageList: PackageResponse) => (this.packageContents = packageList));
    this.store
      .select(selectLoadingPackageTemplates)
      .subscribe((showLazyLoading: boolean) => (this.showLazyLoading = showLazyLoading));
  }
  onSearch(searchString: string): void {
    this.searchString = searchString;
    this.store.dispatch(
      assessmentActions.getPackageList({
        payload: {
          pageMetaData: {
            limit: 30,
            nextOffset: 0,
            offset: 0
          },
          searchString: searchString ? searchString : '',
          status: this.selectedFilterValue ? this.selectedFilterValue : ''
        }
      })
    );
  }
  onFilterValueChange(filterValue: string): void {
    this.store.dispatch(
      assessmentActions.getPackageList({
        payload: {
          pageMetaData: {
            limit: 30,
            nextOffset: 0,
            offset: 0
          },
          searchString: this.searchString ? this.searchString : '',
          status: filterValue ? filterValue : ''
        }
      })
    );
  }

  checkViewPackageStatus(): void {
    this.store.select(selectUserProfileData).subscribe((profileResponse) => {
      profileResponse.attributes.organisations.forEach((organisations) => {
        organisations.roles.forEach((roles) => {
          roles.permissions.forEach((permissions) => {
            if (permissions.code === 'VPK') {
              this.canViewPackage = true;
            }
          });
        });
      });
    });
  }
}
