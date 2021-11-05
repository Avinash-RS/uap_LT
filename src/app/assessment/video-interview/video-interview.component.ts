import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { ToastrService } from 'ngx-toastr';
import { AssessmentAPIService } from 'src/app/rest-api/assessments-api/assessments-api.service';
import _ from 'lodash';
import { AssessmentTaskUrlModel } from 'src/app/rest-api/assessments-api/models/assessment-task-url-response-model';
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
  countdownStart: number = 1;
  firstQusTime:number;
  activequs = 0;
  proctorScreen :any;
  userProfile:any
  qusDetails: any;
  nextQusId: any;
  qusEndTime: any;
  qusStartDate: any;
  qusDuration: number;
  timerActions:any = 'leftTime'
  isRecordStarted:boolean;
  qusEndDate: Date;
  isQusEnable = false;
  lastQusDetails: any;
  isStartEnable = false;
  taskUrlData: AssessmentTaskUrlModel;
  constructor(private route: Router,private dialog: MatDialog, private toast: ToastrService,private http : AssessmentAPIService) {
    this.userProfile = JSON.parse(sessionStorage.getItem('user'));
  

  }

  ngOnInit(): void {
    

    // this.store.select(selectAssessmentTaskUrlState).subscribe((response: AssessmentTaskUrlModel): void => {
    //   this.taskUrlData = response;
    //     console.log(response)
    //   if(this.taskUrlData.proctorToken.length > 0){
    //     // let arr:any = [];
    //     // arr = ;
    //     sessionStorage.setItem('lastQus',JSON.stringify(this.taskUrlData.attributes.lastVideoQuestionDetails))
       
    //   }else {

    //   }
      
    // });
    this.testInformation();
    this.lastQusDetails = JSON.parse(sessionStorage.getItem('lastQus'));
  }

  testInformation(){
    let data = {
      scheduleId : sessionStorage.getItem('schuduleId')
    }
    this.http.getTestInformation(data).subscribe((response: any) => {
      if(response.success == true){
        this.qusInfo = response.data[0].questionDetailsArray;
        if(Object.getOwnPropertyNames(this.lastQusDetails).length > 0){
          this.findLastQusDetails(response.data[0].questionDetailsArray)
        } else {
          this.firstQusTime =  this.qusInfo[0].questionDetails.duration;
          this.timeLeft = this.firstQusTime * 60;
        }
      }else {
        this.toast.warning('Please try after sometime...')
      }
    })
  }

  findLastQusDetails(qusArr){
    let matchLastQus = [];
    qusArr.forEach(element => {
        matchLastQus.push(element.questionDetails)
    });
    // match qus id from qus array 
   let val =  _.filter(matchLastQus, {_id: this.lastQusDetails.id}); // get last qus 
   this.countdownStart = parseInt(this.lastQusDetails.duration);
   this.timeLeft = parseInt(val[0].duration) * 60 - this.countdownStart;
   let index = matchLastQus.findIndex(item => item._id === this.lastQusDetails.id); // find qus index
   this.activequs = index;
  }

  // getTime(duration,index,qusLength,activequs){
  //   this.activequs = index; // display active qus button
  //   this.isStartbtn = true; // start button enable disable
  //   this.timeLeft = parseInt(duration) * 60;  // convert mins into secx
  //   this.countdownStart = 1;
  //   this.qusDetails = this.qusInfo[activequs].questionDetails._id;
  //   this.nextQusId = this.qusInfo[activequs+ 1].questionDetails._id;
  //   this.qusDuration = duration * 60;
  //   if(qusLength -1 == index){
  //     // this.actions('submit',false,activequs);
  //   }else{
  //     this.actions('next', false,activequs);
  //   }
  // }


  startRecord(activequs,stauts,isStart){
    this.isRecordStarted = isStart;
    if(this.isRecordStarted == true){
      this.qusStartDate = new Date();
    }else {
        this.qusStartDate = '';
    }
    this.qusDetails = this.qusInfo[activequs].questionDetails._id;
    this.isStartbtn = false;  // disable start button
    this.actions(stauts,true,activequs);
}

 
  nextQus(nextqus,status){
      if(this.isRecordStarted == true){
            this.isRecordStarted = false;
            this.qusEndDate = new Date();

      }else{
        this.qusStartDate = '';
      }
    this.qusDetails = this.qusInfo[nextqus].questionDetails._id;
    this.nextQusId = this.qusInfo[nextqus+ 1].questionDetails._id;
    this.qusDuration = this.qusInfo[nextqus + 1].questionDetails.duration * 60;
    this.isStartbtn = true; 
    if(this.qusInfo.length > nextqus){
      this.activequs = nextqus + 1;
      this.timeLeft =  this.qusInfo[this.activequs].questionDetails.duration * 60;
      
    }else {
      this.toast.warning('No'+status+'question..')
    }
    this.actions(status, false,this.activequs);
  }

  // skipQus(skipqus,status){
  //   if(this.isRecordStarted == true){
  //     this.isRecordStarted = false;
  //     this.qusEndDate = new Date();

  //       }else{
  //         this.qusStartDate = '';
  //       }
  //           this.isStartbtn = true; 
  //           if(this.qusInfo.length > skipqus){
  //             this.qusDetails = this.qusInfo[skipqus].questionDetails._id;
  //             this.nextQusId = this.qusInfo[skipqus+ 1].questionDetails._id;
  //             this.qusDuration = this.qusInfo[skipqus + 1].questionDetails.duration * 60;
  //             this.activequs = skipqus + 1;
  //             this.timeLeft =  this.qusInfo[this.activequs].questionDetails.duration * 60;
  //             this.actions(status,false, this.activequs);
  //           }else {
  //             this.toast.warning('No question to skip..')
  //           }
  // }

  previousQus(previousQus,status){
    if(this.isRecordStarted == true){
      this.isRecordStarted = false;
      this.qusEndDate = new Date();

      }else{
        this.qusStartDate = '';
      }
    this.isStartbtn = true; 
    if(previousQus > 0){
      this.qusDetails = this.qusInfo[previousQus].questionDetails._id;
      this.nextQusId = this.qusInfo[previousQus - 1].questionDetails._id;
      this.qusDuration = this.qusInfo[previousQus - 1].questionDetails.duration * 60;
      this.activequs = previousQus - 1;
      this.timeLeft =  this.qusInfo[this.activequs].questionDetails.duration * 60;
      this.actions(status,false, this.activequs);
    }else {
      this.toast.warning('No question to previous..')
    }
  }


  // Ans record timer event
  onComplete($event,index){
      if($event){
        if(this.qusInfo.length -1 > index){
          alert('Please press ok to move next question');
            this.isStartbtn = true; 
            // this.timeLeft = 0;
            // this.countdownStart = 1;
            this.activequs = index + 1;
            this.timeLeft =  this.qusInfo[index +1].questionDetails.duration * 60;
            this.nextQusId = this.qusInfo[index+ 1].questionDetails._id;
            this.qusDuration = this.qusInfo[index + 1].questionDetails.duration * 60;
            this.qusEndTime = new Date();
            this.actions('next',false,'')
          }else {
            this.actions('submit',false,'')
            this.toast.warning('No Next question..')
          }
      }
  }

  onTick($event){}

  onStart($event){
    console.log($event)
  }




onSubmit(activequs,stauts){
  this.qusDetails = this.qusInfo[activequs].questionDetails._id;
  this.qusDuration = this.qusInfo[activequs].questionDetails.duration * 60;
  this.actions(stauts,false,activequs);
}

  actions(status,restart,qusIndex){
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
        "startAt": this.qusStartDate ? this.qusStartDate : '' ,
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
        "startAt": this.qusStartDate ? this.qusStartDate : '' ,
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
              if(request.action == 'submit'){
                  this.openDialog()
              }
              this.timeLeft = response.data.timeLeft ? response.data.timeLeft : this.timeLeft;
              if(response.data.timeLeft <=0){
                this.timeLeft = 0;
                this.countdownStart = 0;
                this.counterStart.stop();
                this.toast.warning('Question time expired')
                this.isStartEnable = true;
              }else{
                this.countdownStart = response.data.duration ? response.data.duration : 1;
                if(restart){
                  this.counterStart.begin();
                  setTimeout(() => {
                   this.counterStart.begin();
                  }, 0);
                }
                this.isStartEnable = false;
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


    handleEvent(event:any) {

    }
}
