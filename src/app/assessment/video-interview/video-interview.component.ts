import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { ToastrService } from 'ngx-toastr';
import { AssessmentAPIService } from 'src/app/rest-api/assessments-api/assessments-api.service';
import { UapHttpService } from 'src/app/rest-api/uap-http.service';
@Component({
  selector: 'uap-video-interview',
  templateUrl: './video-interview.component.html',
  styleUrls: ['./video-interview.component.scss']
})
export class VideoInterviewComponent implements OnInit {
  @ViewChild('matDialog1', {static: false}) matDialogRef1: TemplateRef<any>;
  @ViewChild('cd', { static: false })  counterStart: CountdownComponent;
  config: CountdownConfig = {};
  VideoToken: string;
  qusInfo:any = [];
  isStartbtn = true;
  timeLeft: number = 0;
  countdownStart: number =0;
  firstQusTime:number;
  activequs = 0;
  proctorScreen :any;
  userProfile:any
  qusDetails: any;
  nextQusId: any;
  qusEndTime: any;
  qusStartDate: Date;
  qusDuration: number;
  timerActions:any = 'leftTime'
  constructor(private route: Router,private dialog: MatDialog, private toast: ToastrService,private http : AssessmentAPIService) {
    this.userProfile = JSON.parse(sessionStorage.getItem('user'));
    this.testInformation();
  }

  ngOnInit(): void {
    this.testInformation();
  }

  testInformation(){
    let data = {
      scheduleId : sessionStorage.getItem('schuduleId')
    }
    this.http.getTestInformation(data).subscribe((response: any) => {
      if(response.success == true){
        this.qusInfo = response.data[0].questionDetailsArray;
        this.firstQusTime =  this.qusInfo[0].questionDetails.duration;
        this.timeLeft = this.firstQusTime * 60;
      }else {
        this.toast.warning('Please try after sometime...')
      }
    })
  }

  getTime(duration,index,activequs){
    this.activequs = index; // display active qus button
    this.isStartbtn = true; // start button enable disable
    this.timeLeft = parseInt(duration) * 60;  // convert mins into sec
  }


  startRecord(activequs,stauts){
   
    this.qusStartDate = new Date();
    this.qusDetails = this.qusInfo[activequs].questionDetails._id;
    this.isStartbtn = false;  // disable start button
    this.actions(stauts,true);
}

 
  nextQus(nextqus,status){
    this.qusDetails = this.qusInfo[nextqus].questionDetails._id;
    this.nextQusId = this.qusInfo[nextqus+ 1].questionDetails._id;
    this.qusDuration = this.qusInfo[nextqus].questionDetails.duration * 60;
    this.actions(status, false);
    this.isStartbtn = true; 
    if(this.qusInfo.length > nextqus){
      this.activequs = nextqus + 1;
      this.timeLeft =  this.qusInfo[nextqus+ 1].questionDetails.duration * 60;
      
    }else {
      this.toast.warning('No Next question..')
    }
   
  }

  skipQus(skipqus,status){
    this.isStartbtn = true; 
    if(this.qusInfo.length > skipqus){
      this.qusDetails = this.qusInfo[skipqus].questionDetails._id;
      this.nextQusId = this.qusInfo[skipqus+ 1].questionDetails._id;
      this.qusDuration = this.qusInfo[skipqus].questionDetails.duration * 60;
      this.actions(status,false);
      this.activequs = skipqus + 1;
      this.timeLeft =  this.qusInfo[skipqus+ 1].questionDetails.duration * 60;
   
    }else {
      this.toast.warning('No question to skip..')
    }
  }

  previousQus(previousQus,status){
    this.isStartbtn = true; 
    if(previousQus > 0){
      this.qusDetails = this.qusInfo[previousQus].questionDetails._id;
      this.nextQusId = this.qusInfo[previousQus - 1].questionDetails._id;
      this.qusDuration = this.qusInfo[previousQus -1].questionDetails.duration * 60;
      this.actions(status,false);
      this.activequs = previousQus - 1;
      this.timeLeft =  this.qusInfo[previousQus - 1].questionDetails.duration * 60;
    }else {
      this.toast.warning('No question to previous..')
    }
  }


  // Ans record timer event
  onComplete($event,nextqus){
      if($event){
        if(this.qusInfo.length > nextqus){
          alert('Please press ok to move next question');
            this.isStartbtn = true; 
            this.timeLeft = 0;
            this.countdownStart = 0;
            this.activequs = nextqus + 1;
            this.timeLeft =  this.qusInfo[nextqus+ 1].questionDetails.duration * 60;
            this.nextQusId = this.qusInfo[nextqus+ 1].questionDetails._id;
            this.qusDuration = this.qusInfo[nextqus].questionDetails.duration * 60;
            if(this.qusInfo >= nextqus){
              this.actions('next',false)
            }else {
              this.actions('submit',false)
            }

            this.qusEndTime = new Date();
          }else {
            this.toast.warning('No Next question..')
          }
      }
  }

  onTick($event){}

  onStart($event){
  }




onSubmit(activequs,stauts){
  this.qusDetails = this.qusInfo[activequs].questionDetails._id;
  this.actions(stauts,false);
}

  actions(status,restart){
    let request;
    if(status == 'start'){
      request = {
        "scheduleId": sessionStorage.getItem('schuduleId'),
        "startAt": new Date(),
        "questionId":this.qusDetails ? this.qusDetails : '',
        "nextQuestionId":  this.nextQusId ? this.nextQusId : '',
        "emailId" : this.userProfile && this.userProfile.attributes && this.userProfile.attributes.email ? this.userProfile.attributes.email : null,
        "action": status,
      }
    } else if(status == 'submit'){
      request = {
        "scheduleId": sessionStorage.getItem('schuduleId'),
        "startAt": this.qusStartDate,
        "endAt":  new Date(),
        "questionId":this.qusDetails ? this.qusDetails : '',
        "nextQuestionId":  this.nextQusId ? this.nextQusId : '',
        "emailId" : this.userProfile && this.userProfile.attributes && this.userProfile.attributes.email ? this.userProfile.attributes.email : null,
        "action": status,
        "existDuration":  this.qusDuration,
        "assessmentId":sessionStorage.getItem('assessmentId')
      }
    } else{
      request = {
        "scheduleId": sessionStorage.getItem('schuduleId'),
        "startAt": this.qusStartDate,
        "endAt":  new Date(),
        "questionId":this.qusDetails ? this.qusDetails : '',
        "nextQuestionId":  this.nextQusId ? this.nextQusId : '',
        "emailId" : this.userProfile && this.userProfile.attributes && this.userProfile.attributes.email ? this.userProfile.attributes.email : null,
        "action": status,
        "existDuration":  this.qusDuration,
      }

    }
        this.http.submitTestDetails(request).subscribe((response: any) => {
          if(response.success == true){
            console.log(response.data)
              if(request.action == 'submit'){
                  this.openDialog()
              }
              this.timeLeft = response.data.timeLeft ? response.data.timeLeft : this.timeLeft;
              this.countdownStart = response.data.duration;
              if(restart){
                this.counterStart.begin();
                setTimeout(() => {
                 this.counterStart.begin();
                }, 0);
              }

          }else{
          }

        })
    }

    openDialog() {
      const dialogRef = this.dialog.open(this.matDialogRef1,{
        width: '572px',
        height: '286px',
        disableClose: true
      });
    }

    navToLanding(){
      this.route.navigate(['/landing/assessment', sessionStorage.getItem('assessmentId')])
    }


    handleEvent(e: CountdownEvent) {

    }

}
