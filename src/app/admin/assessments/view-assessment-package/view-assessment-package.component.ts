import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import {
  AssessmentsReducerState,
  PublishAssessmentPackageStatusModel
} from '../redux/assessments.model';
import * as assessmentActions from '../redux/assessments.actions';
import {
  selectPackageDetailsState,
  selectPublishAssessmentPackageStatus
} from '../redux/assessments.reducers';
import {
  PackageDetailResponse,
  PackageDetailsData,
  PackageTaskAttributesModel
} from 'src/app/rest-api/package-api/model/package-details.model';
import { AssessmentsModuleEnum } from '../assessments.enums';
import { AssesmentsUtil } from '../assessments.common.utils';
import { selectUserProfileData } from 'src/app/redux/user/user.reducer';
import { takeWhile } from 'rxjs/operators';
import { ErrorResponse } from 'src/app/rest-api/common/models/error.model';

@Component({
  selector: 'app-view-assessment-package',
  templateUrl: 'view-assessment-package.html',
  styleUrls: ['view-assessment-package.scss']
})
export class ViewAssessmentPackageComponent implements OnInit, OnDestroy {
  snackBarSuccessMessage: string;
  snackBarFailureMessage: ErrorResponse;
  alive: boolean;
  showSnackBar: boolean;
  packageDetails: PackageDetailsData;
  testTypes: string[] = ['English', 'Coding', 'Aptitude'];
  assessmentLevels: string[] = ['Professional', 'Practitioner', 'Beginner'];
  toogleView = false;
  assessmentPackageForm: FormGroup;
  packageId: string | undefined;
  canEditPackage = false;
  canPublishPackage = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store<AssessmentsReducerState>,
    public assesmentsUtil: AssesmentsUtil
  ) {
    this.assessmentPackageForm = this.fb.group({
      assessmentName: ['', Validators.required],
      assessmentDescription: ['', Validators.required],
      assessmentLevelSelectOption: ['', Validators.required],
      testItems: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.alive = true;
    this.packageId = this.route.snapshot.paramMap.get('id') || '';
    this.checkPackageAccessStatus();
    this.store.dispatch(
      assessmentActions.initGetPackageDetails({
        payload: {
          packageId: this.packageId,
          orgId:''
        }
      })
    );

    this.store
      .select(selectPackageDetailsState)
      .subscribe((getPackageDetail: PackageDetailResponse) => {
        this.packageDetails = getPackageDetail.data;
        this.packageDetails.attributes.tasks.forEach((task: PackageTaskAttributesModel) => {
          this.addTest(task);
        });
        this.assessmentPackageForm.patchValue({
          assessmentName: this.packageDetails.attributes.name,
          assessmentDescription: this.packageDetails.attributes.description,
          assessmentLevelSelectOption: this.packageDetails.attributes.level
        });
        // Set inital form state in view mode
        this.assessmentPackageForm.disable();
        // Disabling Test Items
        this.disableFormArrayFields();
      });
    this.store
      .select(selectPublishAssessmentPackageStatus)
      .pipe(takeWhile((_) => this.alive))
      .subscribe((publishAssessmentPackageStatus: PublishAssessmentPackageStatusModel) => {
        if (publishAssessmentPackageStatus.success.length) {
          this.showSnackBar = true;
          this.snackBarSuccessMessage = publishAssessmentPackageStatus.success;
        }
        if (publishAssessmentPackageStatus.failureMessage?.error.errors.length) {
          this.snackBarFailureMessage = publishAssessmentPackageStatus.failureMessage;
        }
      });
  }

  disableFormArrayFields(): void {
    this.getTestItems.controls.forEach((formControl: AbstractControl) => {
      formControl.disable();
    });
  }

  addTest(testItem: PackageTaskAttributesModel): void {
    this.getTestItems.push(this.createTestFields(testItem));
  }

  createTestFields(testItem: PackageTaskAttributesModel): FormGroup {
    return this.fb.group({
      testTypeSelectOption: [testItem.type],
      testName: [testItem.name]
    });
  }

  get getTestItems(): FormArray {
    return this.assessmentPackageForm.get('testItems') as FormArray;
  }

  publishAssessmentPackage(): void {
    this.store.dispatch(
      assessmentActions.initPublishAssessmentPackage({
        payload: {
          data: {
            id: this.packageId,
            type: 'package',
            fields: ['STATUS'],
            attributes: {
              status: AssessmentsModuleEnum.PublishedAssessmentStatus
            }
          },
          navigateToAssessmentListPage: true
        }
      })
    );
  }

  editAssessmentPackage(): void {
    this.toogleView = true;
  }
  archiveAssessmentPackage(): void {
    this.store.dispatch(
      assessmentActions.initPatchAssessmentPackageStatus({
        payload: {
          data: {
            id: this.packageDetails.id.toString(),
            fields: ['STATUS'],
            attributes: {
              status: AssessmentsModuleEnum.ArchivedAssessmentStatus
            }
          },
          navigateToAssessmentListPage: true
        }
      })
    );
  }

  checkPackageAccessStatus(): void {
    this.store.select(selectUserProfileData).subscribe((profileResponse) => {
      profileResponse.attributes.organisations.forEach((organisations) => {
        organisations.roles.forEach((roles) => {
          roles.permissions.forEach((permissions) => {
            if (permissions.code === 'EPK') {
              this.canEditPackage = true;
            }
            if (permissions.code === 'PPK') {
              this.canPublishPackage = true;
            }
          });
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.showSnackBar = false;
    this.store.dispatch(assessmentActions.clearPublishAssessmentPackageStatus());
    this.store.dispatch(assessmentActions.clearPackageDetailsState());
  }
}
