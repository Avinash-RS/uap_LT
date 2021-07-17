import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { LandingPageUtils } from '../landing-page.common.utils';
import { AssessmentSummaryModel, StartTimeModel } from './task-cards.model';
import { AssessmentTasksReducerState } from '../redux/landing-page.model';
import { Store } from '@ngrx/store';
import * as assessmentTasksActions from '../redux/landing-page.actions';
import { ActivatedRoute } from '@angular/router';
import { AssessmentTaskResponse } from 'src/app/rest-api/assessments-api/models/assessment-task-response-model';
import { selectAssessmentTaskUrlState } from '../redux/landing-page.reducers';
import { AssessmentTaskUrlModel } from 'src/app/rest-api/assessments-api/models/assessment-task-url-response-model';
import * as moment from 'moment'; //in your component

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
  @Input() canTakeAssessment: boolean;
  @Input() assessmentTasksList: AssessmentTaskResponse[];
  @Output() summaryDetails: EventEmitter<AssessmentSummaryModel> = new EventEmitter();

  constructor(
    public landingUtil: LandingPageUtils,
    private route: ActivatedRoute,
    private store: Store<AssessmentTasksReducerState>
  ) {}

  ngOnInit(): void {
    this.assessmentTasksList.forEach((task) => {
      const startTime = new Date(task.startTime);
      this.taskDuration.push(this.getTaskDuration(task.duration));
      this.taskStatus.push(task.status.toLowerCase());
      const currentTime = new Date();
      this.isTaskStarted.push(startTime > currentTime);
      this.getCountdownTimer(startTime, currentTime);
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

  navigateToTask(taskId: number): void {
    this.store.dispatch(
      assessmentTasksActions.getAssessmentTaskUrl({
        payload: {
          assessmentId: this.route.snapshot.paramMap.get('id') || '',
          taskId
        }
      })
    );
    this.store.select(selectAssessmentTaskUrlState).subscribe((response: AssessmentTaskUrlModel): void => {
      this.taskUrlData = response;
      console.log('response', response);      
      if (this.taskUrlData.attributes.taskUrl) {
        window.location.assign(this.taskUrlData.attributes.taskUrl);
      }
    });
  }

  getCountdownTimer(startTime: Date, currentTime: Date): void {
    const leftOutTime = startTime.getTime() - currentTime.getTime();
    this.showTaskStartsOn.push(leftOutTime > 0);
    const leftTime = leftOutTime / 1000;
    const startOn = `${startTime.getDate()}/${startTime.getMonth() + 1}/${startTime.getFullYear()}`;
    const showCountdown = leftTime < 86400 ? true : false;
    this.taskStartTime.push(
      { countdown: { leftTime, format: 'HH: mm: ss' }, startOn, showCountdown }
    );
  }

  ngOnDestroy(): void { }

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
      let custom = moment(data.endTime).diff(moment.now(), 'minutes');
      if (custom > 0) {
        return false;
      }
      return true;
    }  
    }
}
