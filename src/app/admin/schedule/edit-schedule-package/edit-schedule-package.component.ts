import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminUtils } from '../../admin.utils';
import { ScheduleAPIService } from 'src/app/rest-api/schedule-api/schedule-api.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-edit-schedule-package',
  templateUrl: './edit-schedule-package.component.html',
  styleUrls: ['./edit-schedule-package.component.scss']
})
export class EditSchedulePackageComponent implements OnInit {
  scheduleData: any;
  subscription: any;
  batchDetails: any;
  maxDate: Date;
  minDate: Date;
  selectedbatchId: string;
  selectedbatchName: string;
  //Time
  batchEndTime: any;
  batchStartTime: any;
  //Date
  scheduleStartDate: any;
  scheduleEndDate: any;
  selectedDate: Date;
  selectedTime: any;
  scheduleDateTimeTimeStamp: string;
  startDateWithDurations: string;
  is_proctor: any;
  is_published: any;
  send_Notification:any;
  publishDate: any;
  publishTime: string;
  publishDateTimeStamp: string;
  showpublishDate = false;
  constructor(
    private toaster: ToastrService,
    private scheduleService: ScheduleAPIService,
    private router: Router,
    private adminUtils: AdminUtils
  ) {
    if (
      this.router.getCurrentNavigation() !== null &&
      this.router.getCurrentNavigation().extras !== undefined &&
      this.router.getCurrentNavigation().extras.state !== undefined &&
      this.router.getCurrentNavigation().extras.state.data !== undefined
    ) {
      this.batchDetails = this.router.getCurrentNavigation().extras.state.data;
      this.is_proctor = this.batchDetails.attributes.is_proctor;
      this.is_published = this.batchDetails.attributes.is_published;
      this.send_Notification = this.batchDetails.attributes.send_Notification;
      const selectedDate: Date = this.batchDetails.attributes.startDateTime;
      const selectedEndDate: Date = this.batchDetails.attributes.endDateTime;
      const duration = this.batchDetails.attributes.duration;
      const publishdate: Date = this.batchDetails.attributes.publishDate ? this.batchDetails.attributes.publishDate :  new Date();;

      this.startDateWithDurations = moment(selectedDate).add(duration, 'minutes').format('YYYY-MM-DDTHH:mm:ss');

      // Start date and time
      this.scheduleStartDate = new Date(selectedDate);
      this.batchStartTime = this.formatAMPM(this.scheduleStartDate);
      // End date and time
      this.scheduleEndDate = new Date(selectedEndDate);
      this.batchEndTime = this.formatAMPM(this.scheduleEndDate);

      this.publishDate = new Date(publishdate);
      this.publishTime = this.formatAMPM(this.publishDate);

      this.maxDate = this.scheduleStartDate;
      this.minDate = this.scheduleEndDate;
    } else {
      this.router.navigate(['/admin/schedule/list']);
    }
  }

  ngOnInit(): void {}

  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  onEndDateChanged(event: MatDatepickerInputEvent<Date>): void {
    this.scheduleEndDate = event.value;
  }

  onEndTimeChanged(time: any): void {
    this.batchEndTime = time;
  }

  onpublishDateChanged(event: MatDatepickerInputEvent<Date>): void{
    this.publishDate = event.value;
  }

  onpublishTimeChanged(time: any): void{
    this.publishTime = time;
  }

  updateSchedule() {
    const concatedDateTime = this.getConcatedDateTime(this.scheduleEndDate, this.batchEndTime);
    this.scheduleDateTimeTimeStamp = new Date(concatedDateTime).toISOString();
    const concatedpublishDateTime = this.getConcatedDateTime(this.publishDate, this.publishTime);
    this.publishDateTimeStamp = new Date(concatedpublishDateTime).toISOString();
    const dateIsBefore = moment(this.startDateWithDurations).isBefore(
      moment(this.scheduleDateTimeTimeStamp)
    );

    if (dateIsBefore) {
      this.isproctorChange();
      this.ispublishChange();
      let data = {
        scheduleId: this.batchDetails.id,
        startTime: this.batchDetails.attributes.startDateTime,
        endTime: this.scheduleDateTimeTimeStamp,
        publishDate: this.publishDateTimeStamp,
        is_published: this.is_published,
        is_proctor: this.is_proctor
      };
      this.scheduleService.updateScheduleEndDate(data).subscribe((response: any) => {
        if (response.success) {
          this.toaster.success(response.message);
          this.router.navigate(['/admin/schedule/list']);
        } else {
          this.toaster.warning(response.message);
        }
      });
    } else {
      this.toaster.warning('End date should be greater than start date and test durations ');
    }
  }

  getConcatedDateTime(selectedEndDate: Date, scheduleEndTime: string): string {
    return (
      selectedEndDate.toString().substring(0, 15) +
      ' ' +
      this.adminUtils.timeConversion(scheduleEndTime)
    );
  }

  isproctorChange() {
    if (this.is_proctor == false) {
      this.is_proctor = 0;
    } else {
      this.is_proctor = 1;
    }
  }

  ispublishChange() {
    if (this.is_published == false) {
      this.is_published = 0;
    } else {
      this.is_published = 1;
    }
  }

}
