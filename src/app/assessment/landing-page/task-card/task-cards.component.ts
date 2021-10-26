import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { LandingPageUtils } from '../landing-page.common.utils';
import { AssessmentSummaryModel, StartTimeModel } from './task-cards.model';
import { AssessmentTasksReducerState } from '../redux/landing-page.model';
import { Store } from '@ngrx/store';
import * as assessmentTasksActions from '../redux/landing-page.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentTaskResponse } from 'src/app/rest-api/assessments-api/models/assessment-task-response-model';
import { selectAssessmentTaskUrlState } from '../redux/landing-page.reducers';
import { AssessmentTaskUrlModel } from 'src/app/rest-api/assessments-api/models/assessment-task-url-response-model';
import * as moment from 'moment'; //in your component
import { UapHttpService } from 'src/app/rest-api/uap-http.service';
import { ToastrService } from 'ngx-toastr';
import { SentData } from 'src/app/rest-api/sendData';

@Component({
  selector: 'app-task-cards',
  templateUrl: './task-cards.component.html',
  styleUrls: ['./task-cards.component.scss']
})
export class TaskCardsComponent implements OnInit, OnDestroy {
  totalHours = 0;
  totalMinutes = 0;
  taskDuration: string[] = [];
  taskStatus: string[] = [];
  taskUrlData: AssessmentTaskUrlModel;
  isTaskStarted: boolean[] = [];
  taskStartTime: StartTimeModel[] = [];
  showTaskStartsOn: boolean[] = [];
  startTime1: any;
  userDetails: any = [];
  @Input() canTakeAssessment: boolean;
  @Input() assessmentTasksList: AssessmentTaskResponse[];
  @Output() summaryDetails: EventEmitter<AssessmentSummaryModel> = new EventEmitter();

  constructor(
    public landingUtil: LandingPageUtils,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AssessmentTasksReducerState>,
    private httpClient: UapHttpService,
    private toast: ToastrService,
  ) {}

  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem('user'));
    this.assessmentTasksList.forEach((task) => {
      // console.log(this.assessmentTasksList,task)
      let startTime: any = new Date(task.startTime).toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata'
      });
      this.startTime1 = new Date(startTime);
      this.taskDuration.push(this.getTaskDuration(task.duration));
      this.taskStatus.push(task.status.toLowerCase());
      // const currentTime = new Date();
      let currentTime: any = new Date(task.currentDateTime).toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata'
      });
      currentTime = new Date(currentTime);
      this.isTaskStarted.push(this.startTime1 > currentTime);
      this.getCountdownTimer(this.startTime1, currentTime);
    });

    const assessmentTotalMinutes = this.landingUtil.getHourAndMinutes(
      this.totalHours * 60 + this.totalMinutes
    );
    this.summaryDetails.emit({
      hour: this.landingUtil.getDurationMessage(assessmentTotalMinutes),
      tasks: this.assessmentTasksList.length
    });
  }

  getTaskDuration(taskDuration: number): string {
    const hourAndMinute = this.landingUtil.getHourAndMinutes(taskDuration);
    this.totalMinutes += hourAndMinute.minute;
    this.totalHours += hourAndMinute.hour;
    return this.landingUtil.getDurationMessage(hourAndMinute);
  }

  navigateToTask(taskId: number, taskType: any, task: any): void {
    if (taskType == 'Video') {
      this.store.dispatch(
        assessmentTasksActions.getAssessmentTaskUrl({
          payload: {
            assessmentId: this.route.snapshot.paramMap.get('id') || '',
            taskId,
            loginId: sessionStorage.getItem('loginId')
          }
        })
      );
      this.store
        .select(selectAssessmentTaskUrlState)
        .subscribe((response: AssessmentTaskUrlModel): void => {
          this.taskUrlData = response;
          if(this.taskUrlData.proctorToken.length > 0){
            sessionStorage.setItem('videotoken', this.taskUrlData.proctorToken);
            sessionStorage.setItem("smallScreen", 'false')
            sessionStorage.setItem('schuduleId',this.taskUrlData.attributes.scheduleId);
            this.router.navigate(['/landing/TestInformation']);
          }else {

          }
          
        });
    } else {
      this.store.dispatch(
        assessmentTasksActions.getAssessmentTaskUrl({
          payload: {
            assessmentId: this.route.snapshot.paramMap.get('id') || '',
            taskId,
            loginId: sessionStorage.getItem('loginId')
          }
        })
      );
      this.store
        .select(selectAssessmentTaskUrlState)
        .subscribe((response: AssessmentTaskUrlModel): void => {
          this.taskUrlData = response;
          if (this.taskUrlData.attributes.taskUrl) {
            window.location.assign(this.taskUrlData.attributes.taskUrl);
          }
        });
    }
  }

  getCountdownTimer(startTime: Date, currentTime: Date): void {
    const leftOutTime = startTime.getTime() - currentTime.getTime();
    this.showTaskStartsOn.push(leftOutTime > 0);
    const leftTime = leftOutTime / 1000;
    const startOn = `${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`;
    const showCountdown = leftTime < 86400 ? true : false;
    this.taskStartTime.push({
      countdown: { leftTime, format: 'HH: mm: ss' },
      startOn,
      showCountdown
    });
  }

  ngOnDestroy(): void {}

  countdownchange(event: any, index: number): void {
    if (event.action === 'done') {
      this.showTaskStartsOn[index] = false;
      this.isTaskStarted[index] = false;
    }
  }

  getTooltipMessage(data) {
    let custom = moment(data.endTime).diff(moment.now(), 'minutes');
    if (custom > 0) {
      return '';
    }
    return 'Test time has been completed';
  }

  getIsTimeOutStatus(data, status) {
    if (status == 'inprogress' || status == 'yettostart') {
      // console.log(moment(data.endTime).diff(moment.now(), 'minutes'),'akjsgakjdbkjgdga')
      // console.log('moment(data.endTime)', moment(data.endTime).format('YYYY-MM-DD HH:mm:ss'));
      let custom = moment(data.endTime).diff(moment.now(), 'minutes');
      if (custom > 0) {
        return false;
      }
      return true;
    }
  }

  isEclipsisNeeded(name) {
    if (name.length > 43) {
      let eclipe = '...';
      return name.substr(0, 43) + eclipe;
    } else {
      return name;
    }
  }

  getTime(date) {
    if (date) {
      const split = moment(date).format('LLL');
      return split;
    }
  }


}
