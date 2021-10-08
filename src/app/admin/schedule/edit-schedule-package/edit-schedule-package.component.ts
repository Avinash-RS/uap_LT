import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchedulerReducerState } from '../redux/schedule.model';
import { Store } from '@ngrx/store';
import { AdminUtils } from '../../admin.utils';
import { ScheduleAPIService } from 'src/app/rest-api/schedule-api/schedule-api.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-schedule-package',
  templateUrl: './edit-schedule-package.component.html',
  styleUrls: ['./edit-schedule-package.component.scss']
})
export class EditSchedulePackageComponent implements OnInit {
  scheduleData:any;
  subscription: any;
  batchDetails:any;
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


  constructor(private toaster: ToastrService,private scheduleService: ScheduleAPIService,private router: Router,private store: Store<SchedulerReducerState>,private adminUtils: AdminUtils,) {
          if(this.router.getCurrentNavigation() !== null && this.router.getCurrentNavigation().extras !== undefined  && this.router.getCurrentNavigation().extras.state !== undefined && this.router.getCurrentNavigation().extras.state.data !== undefined ){
            this.batchDetails = this.router.getCurrentNavigation().extras.state.data;
            const selectedDate: Date =  this.batchDetails.attributes.startDateTime;
            const selectedEndDate: Date =  this.batchDetails.attributes.endDateTime;
            const duration = this.batchDetails.attributes.duration

            this.startDateWithDurations = moment(selectedDate).add(duration,'minutes').format('YYYY-MM-DDTHH:mm:ss');
            // this.startDateWithDurations = new Date(startWithDuration).toISOString();

            // Start date and time
            this.scheduleStartDate = new Date(selectedDate);
            this.batchStartTime = this.formatAMPM(this.scheduleStartDate)
            // End date and time
            this.scheduleEndDate = new Date(selectedEndDate)
            this.batchEndTime = this.formatAMPM(this.scheduleEndDate)
      
            this.maxDate =  this.scheduleStartDate;
            this.minDate =   this.scheduleEndDate;
          }else {
          this.router.navigate(['/admin/schedule/list'])
        }
   }

  ngOnInit(): void {

}

 formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}


onEndDateChanged(event: MatDatepickerInputEvent<Date>): void {
   this.scheduleEndDate = event.value;
}

onEndTimeChanged(time: any): void {
  this.batchEndTime = time;
}


updateSchedule(){
  const concatedDateTime = this.getConcatedDateTime(this.scheduleEndDate, this.batchEndTime)
  this.scheduleDateTimeTimeStamp = new Date(concatedDateTime).toISOString();
  // this.scheduleDateTimeTimeStamp = moment(concatedDateTime).format('YYYY-MM-DDTHH:mm:ss');
  const dateIsBefore = moment(this.startDateWithDurations).isBefore(moment(this.scheduleDateTimeTimeStamp));
   if(dateIsBefore){
    let data = {
      "scheduleId":this.batchDetails.id,
      "endTime":this.scheduleDateTimeTimeStamp
    }
    this.scheduleService.updateScheduleEndDate(data).subscribe((response: any)=> {
        if(response.success = true){
          this.toaster.success(response.message);
          this.router.navigate(['/admin/schedule/list'])
        }else {
          this.toaster.warning('Please Try again...', 'Something went wrong');
        }
    })
   }else {
     this.toaster.warning('End date should be greater than start date and test durations ')
   }

}

getConcatedDateTime(selectedEndDate: Date, scheduleEndTime: string): string {
  return (
    selectedEndDate.toString().substring(0, 15) + ' ' + this.adminUtils.timeConversion(scheduleEndTime)
  );
}

}
