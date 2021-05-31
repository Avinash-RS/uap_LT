import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AssessmentTasksReducerState } from './redux/landing-page.model';
import { AssessmentSummaryModel } from './task-card/task-cards.model';
import * as assessmentTasksActions from './redux/landing-page.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { selectAssessmentTasksListState } from './redux/landing-page.reducers';
import { AssessmentTaskModel } from 'src/app/rest-api/assessments-api/models/assessment-response.model';
import { AssessmentTaskResponse } from 'src/app/rest-api/assessments-api/models/assessment-task-response-model';
import { AssessmentsModuleEnum } from 'src/app/admin/assessments/assessments.enums';
import { selectUserProfileData } from 'src/app/redux/user/user.reducer';

@Component({
  selector: 'app-assessment-landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrls: ['landing-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingPageComponent implements OnInit, OnDestroy {
  candidateDetailsForm: FormGroup;
  showAssessmentSummary = false;
  totalHours = '';
  tasksCount = 0;
  disableConsent = true;
  assessmentData: AssessmentTaskModel;
  isAllTasksCompleted = false;
  assessmentTasksList: AssessmentTaskResponse[];
  assessmentID = '';
  displayTermsAndCondition = false;
  canTakeAssessment = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AssessmentTasksReducerState>
  ) {
    this.candidateDetailsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      consent: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.assessmentID = this.route.snapshot.paramMap.get('id') || '';
    this.checkAssessmentTakingStatus();
    this.store.dispatch(
      assessmentTasksActions.getAssessmentTaskList({
        payload: {
          assessmentId: this.assessmentID
        }
      })
    );
    this.store.select(selectAssessmentTasksListState).subscribe((response) => {
      this.assessmentData = response;
      console.log('aad', response);
      
      if (this.assessmentData.failureMessage?.error.errors[0].code === '4030') {
        this.router.navigateByUrl('/unauthorized');
      }
      this.assessmentTasksList = this.assessmentData.data.attributes.assessmentTasks;
      const completedAssessmentTasksLength = this.assessmentTasksList.filter(
        (task) =>
          task.status.toLowerCase() ===
          AssessmentsModuleEnum.CompletedAssessmentStatus.toLowerCase()
      );
      if (this.assessmentTasksList.length === completedAssessmentTasksLength.length) {
        this.isAllTasksCompleted = true;
      } else {
        this.isAllTasksCompleted = false;
      }
      this.candidateDetailsForm
        .get('firstName')
        ?.setValue(this.assessmentData.data.attributes.firstName);
      this.candidateDetailsForm
        .get('lastName')
        ?.setValue(this.assessmentData.data.attributes.lastName);
      this.candidateDetailsForm
        .get('consent')
        ?.setValue(this.assessmentData.data.attributes.hasAccepted);
    });
    this.candidateDetailsForm.valueChanges.subscribe(() => {
      if (
        this.candidateDetailsForm.get('firstName')?.valid &&
        this.candidateDetailsForm.get('lastName')?.valid
      ) {
        this.disableConsent = false;
      } else {
        this.disableConsent = true;
      }
      if (this.candidateDetailsForm.valid) {
        this.disableConsent = true;
        this.showAssessmentSummary = true;
      }
    });
  }

  summaryDetails(summary: AssessmentSummaryModel): void {
    console.log('sub', summary);
    
    this.tasksCount = summary.tasks;
    this.totalHours = summary.hour;
  }

  updateAssessmentData(): void {
    this.store.dispatch(
      assessmentTasksActions.updateAssessment({
        payload: {
          updateData: {
            type: 'assessment',
            attributes: {
              firstName: this.candidateDetailsForm.get('firstName')?.value,
              lastName: this.candidateDetailsForm.get('lastName')?.value,
              hasAccepted: true,
              status: AssessmentsModuleEnum.InProgressAssessmentStatus
            }
          },
          assessmentId: this.assessmentID
        }
      })
    );
  }

  toggleTermsAndCondition(): void {
    this.displayTermsAndCondition = !this.displayTermsAndCondition;
  }

  checkAssessmentTakingStatus(): void {
    this.store.select(selectUserProfileData).subscribe((profileResponse) => {
      profileResponse.attributes.organisations.forEach((organisations) => {
        organisations.roles.forEach((roles) => {
          roles.permissions.forEach((permissions) => {
            if (permissions.code === 'LAS') {
              this.canTakeAssessment = true;
            }
          });
        });
      });
    });
  }

  ngOnDestroy(): void {}
}
