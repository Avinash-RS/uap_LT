import { LoadingService } from './../../rest-api/loading.service';
import { environment } from 'src/environments/environment';
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
import { ToastrService } from 'ngx-toastr';
import { AssessmentAPIService } from 'src/app/rest-api/assessments-api/assessments-api.service';
import * as moment from 'moment'; //in your component
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { UapHttpService } from 'src/app/rest-api/uap-http.service';

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
  notShowThankYou = false;
  backToCertificationPortal: boolean;
  taskIds: any = [];
  KisshtHtml;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AssessmentTasksReducerState>,
    private toast: ToastrService,
    private assessmentApiService: AssessmentAPIService,
    private _loading: LoadingService 
  ) {
    this._loading.setLoading(false, 'request.url');
    this.candidateDetailsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      consent: [false]
    });
  }

  ngOnInit(): void {


    this.assessmentID = this.route.snapshot.paramMap.get('id') || '';
    this.checkAssessmentTakingStatus();
    if (sessionStorage.getItem('statusCheck')) {
      let data = JSON.parse(sessionStorage.getItem('statusCheck'));
      this.statusCheckApi(data);
    } else {
      this.store.dispatch(
        assessmentTasksActions.getAssessmentTaskList({
          payload: {
            assessmentId: this.assessmentID,
            loginId: sessionStorage.getItem('loginId')
          }
        })
      );  
    }
    this.store.select(selectAssessmentTasksListState).subscribe((response) => {
      this.assessmentData = response;
      if (this.assessmentData.failureMessage?.error.errors[0].code === '4030') {
        this.router.navigateByUrl('/unauthorized');
      }
      this.assessmentTasksList = this.assessmentData.data.attributes.assessmentTasks;
      this.getTaskIds();
      const completedAssessmentTasksLength = this.assessmentTasksList.filter(
        (task) =>
          task.status.toLowerCase() ===
          AssessmentsModuleEnum.CompletedAssessmentStatus.toLowerCase()
      );
      if (this.assessmentTasksList.length === completedAssessmentTasksLength.length) {
        this.isAllTasksCompleted = true;
        // this.toast.success('You have completed this assessment and can now close this window safely.', 'Thank You !', {
        //   timeOut: 0,
        //   tapToDismiss: false,
        //   disableTimeOut: true,
        //   positionClass: 'toast-top-right'
        // });
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
          // this.disableConsent = true;
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
    this.checkBackButtonEnabled();
  }

  nav(){
    // this.getVideoAssesmentToken()
    this.router.navigateByUrl('/landing/SystemReadinessCheck');
  }


  getTaskIds() {
    this.taskIds = [];
    const userProfile = JSON.parse(sessionStorage.getItem('user'));
    let email = userProfile && userProfile.attributes && userProfile.attributes.email ? userProfile.attributes.email : '';
    this.assessmentTasksList.forEach(element => {
      if (element.taskName && (element.status == 'InProgress' || element.status == 'YetToStart') && (element.taskType == 'Coding' || element.taskType == 'English')) {
        let custom = moment(element.endTime).diff(moment.now(), 'minutes');
        if (custom > 0) {
          let apiData = {
            testIds: Number(element.id),
            email,
            type: element.taskType,
            deliveryId: element.deliveryId ? element.deliveryId : '',
            assessmentId: this.assessmentID
          }
          this.taskIds.push(apiData);
        }
      }
    });
    (this.taskIds.length > 0) ? this.taskStatusApi(this.taskIds) : '';
  }

  taskStatusApi(Taskids) {
    const apiData = Taskids;
    sessionStorage.setItem('statusCheck', JSON.stringify(apiData));
  }

  statusCheckApi(apiData) {
    this._loading.setLoading(true, 'status');
      this.assessmentApiService.getStatus(apiData).subscribe((response: any)=> {
        this._loading.setLoading(false, 'status');
        this.assessmentTasksList = [];
        this.store.dispatch(
          assessmentTasksActions.getAssessmentTaskList({
            payload: {
              assessmentId: this.assessmentID,
              loginId: sessionStorage.getItem('loginId')
            }
          })
        );    
    }, (err)=> {
      this._loading.setLoading(false, 'status');
      this.store.dispatch(
        assessmentTasksActions.getAssessmentTaskList({
          payload: {
            assessmentId: this.assessmentID,
            loginId: sessionStorage.getItem('loginId')
          }
        })
      );  
    });
  }
  checkBackButtonEnabled() {
    let check = sessionStorage.getItem('fromCert') && sessionStorage.getItem('fromCert') == 'true' ? true : false;
    this.backToCertificationPortal = check;
  }
  redirectTo() {
     return window.location.href = environment.MICROCERTREDIRECT;
  }
  summaryDetails(summary: AssessmentSummaryModel): void {    
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

  ngOnDestroy(): void {
    
  }
}
