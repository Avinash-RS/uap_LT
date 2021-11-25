import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { ToastrService } from 'ngx-toastr';
import { AssessmentAPIService } from 'src/app/rest-api/assessments-api/assessments-api.service';
import _ from 'lodash';
import { AssessmentTaskUrlModel } from 'src/app/rest-api/assessments-api/models/assessment-task-url-response-model';
import { LoadingService } from 'src/app/rest-api/loading.service';
import * as moment from 'moment';
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
  activequs:any = 0;
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
  isNextBtn = true;
  displayQus: any;
  qusTime: string;
  constructor(private _loading: LoadingService,private route: Router,private dialog: MatDialog, private toast: ToastrService,private http : AssessmentAPIService) {
    this.userProfile = JSON.parse(sessionStorage.getItem('user'));
    // sessionStorage.setItem('activequs',this.activequs)
    this.activequs = sessionStorage.getItem('activequs') ? sessionStorage.getItem('activequs') : 0;

  }

  ngOnInit(): void {
    this.testInformation();
    this.lastQusDetails = JSON.parse(sessionStorage.getItem('lastQus'));
  }

  testInformation(){
    let data = {
      scheduleId : sessionStorage.getItem('schuduleId')
    }
    this.http.getTestInformation(data).subscribe((response: any) => {
      if(response.success == true){
        this._loading.setLoading(false, 'request.url');
        this.qusInfo = response.data[0].questionDetailsArray;
        this.displayQus =  this.qusInfo[this.activequs].questionDetails.question;
        if(Object.getOwnPropertyNames(this.lastQusDetails).length > 0){
          this.findLastQusDetails(response.data[0].questionDetailsArray)
        } else {
          this.firstQusTime =  this.qusInfo[this.activequs].questionDetails.duration;
          this.timeLeft = this.firstQusTime * 60;
          this.getQusDuration(this.timeLeft)
        }
      }else {
        this.toast.warning('Please try after sometime...')
        this._loading.setLoading(false, 'request.url');
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
   this.displayQus =  val[0].question;
   let index = matchLastQus.findIndex(item => item._id === this.lastQusDetails.id); // find qus index
   this.activequs = index;
   sessionStorage.setItem('activequs',this.activequs)
  }


  startRecord(activequs,stauts,isStart){
    this.isRecordStarted = isStart;
    // this.isNextBtn = true;
    if(this.isRecordStarted == true){
      this.qusStartDate = new Date();
    }else {
        this.qusStartDate = '';
    }
    this.qusDetails = this.qusInfo[activequs].questionDetails._id;
    this.isStartbtn = false;  // disable start button
    sessionStorage.setItem('activequs',this.activequs)
    this.actions(stauts,true,activequs);
}

 
  nextQus(nextqus,status){
    // this.isNextBtn = true;
      if(this.isRecordStarted == true){
            this.isRecordStarted = false;
            this.qusEndDate = new Date();
      }else{
        this.qusStartDate = '';
      }
    // this.isStartbtn = true; 
    if(this.qusInfo.length > this.activequs){
      this.activequs = parseInt(this.activequs + 1) ;
      this.qusDetails = this.qusInfo[this.activequs].questionDetails._id;
      this.nextQusId = this.qusInfo[this.activequs].questionDetails._id;
      this.qusDuration = this.qusInfo[this.activequs].questionDetails.duration * 60;
      sessionStorage.setItem('activequs',this.activequs)
      this.displayQus = this.qusInfo[this.activequs].questionDetails.question;
      this.timeLeft =  this.qusInfo[this.activequs].questionDetails.duration * 60;
      this.getQusDuration(this.timeLeft)
      setTimeout(() => {
        this.timeLeft =  this.qusInfo[this.activequs].questionDetails.duration * 60;
        this.counterStart.begin();
       }, 0);
    }else {
      this.toast.warning('No '+status+' question..')
    }
    this.actions(status, false,this.activequs);
  }


    // Ans record timer event
    // onComplete($event,index){
  //     debugger
  //     if($event){
  //       if(this.qusInfo.length >  parseInt(index)){
  //         this.toast.success('Question time expired moving to next question')
  //           this.isStartbtn = false; 
  //           this.activequs = parseInt(this.activequs) + 1;
  //           sessionStorage.setItem('activequs', this.activequs + 1)
  //           this.displayQus = this.qusInfo[this.activequs].questionDetails.question
  //           this.timeLeft =  this.qusInfo[this.activequs].questionDetails.duration * 60;
  //           this.getQusDuration(this.timeLeft)
  //           this.nextQusId = this.qusInfo[this.activequs].questionDetails._id;
  //           this.qusDuration = this.qusInfo[this.activequs].questionDetails.duration * 60;
  //           this.qusEndTime = new Date();
  //           this.actions('auto complete',true,'');
  //           this.countdownStart = null;
  //           setTimeout(() => {
  //             this.timeLeft =  this.qusInfo[this.activequs].questionDetails.duration * 60;
  //             this.getQusDuration(this.timeLeft)
  //             this.counterStart.begin();
  //            }, 0);
  //         }else {
  //           this.actions('submit',false,'')
  //           this.toast.warning('No Next question..')
  //         }
  //     }
  // }

  // onTick($event){}

  // onStart($event){
    // console.log($event)
  // }

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
        "question":  this.displayQus,
        "questionNo":parseInt(this.activequs + 1) ,
        "candidateId": this.userProfile && this.userProfile.attributes && this.userProfile.attributes.id ? this.userProfile.attributes.id : null
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
        "assessmentId":sessionStorage.getItem('assessmentId'),
        "question":  this.displayQus,
        "questionNo":parseInt(this.activequs + 1) ,
        "candidateId": this.userProfile && this.userProfile.attributes && this.userProfile.attributes.id ? this.userProfile.attributes.id : null
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
        "question":  this.displayQus,
        "questionNo":parseInt(this.activequs + 1),
        "candidateId": this.userProfile && this.userProfile.attributes && this.userProfile.attributes.id ? this.userProfile.attributes.id : null
      }

    }
        this.http.submitTestDetails(request).subscribe((response: any) => {
          if(response.success == true){
              if(request.action == 'submit'){
                  this.openDialog()
              }
              // this.timeLeft = response.data.timeLeft ? response.data.timeLeft : this.timeLeft;
              if(response.data.timeLeft <=0){
                this.timeLeft = 0;
                this.countdownStart = 1;
                this.counterStart.stop();
                this.toast.warning('Question time expired');
                this.isStartEnable = true;
              }else{
                // this.timeLeft = 0;
                // this.countdownStart = 1;
                this.countdownStart = response.data.duration ? response.data.duration : 1;
                this.timeLeft = response.data.timeLeft ? response.data.timeLeft : this.timeLeft;
                this.getQusDuration(this.timeLeft)
                if(restart){
                  this.counterStart.begin();
                  setTimeout(() => {
                    this.countdownStart = 1;
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
        disableClose: true,
        panelClass: 'popupClass'
      });
    }

    navToLanding(){
      this.route.navigate(['/landing/assessment', sessionStorage.getItem('assessmentId')])
    }


    handleEvent(event:any,index) {
        if(event.left == 0){
          if(this.qusInfo.length - 1 >  this.activequs){
            this.toast.success('Question time expired moving to next question')
              this.isStartbtn = false; 
              this.activequs = parseInt(this.activequs) + 1;
              sessionStorage.setItem('activequs', this.activequs + 1)
              this.displayQus = this.qusInfo[this.activequs].questionDetails.question
              this.timeLeft =  this.qusInfo[this.activequs].questionDetails.duration * 60;
              this.getQusDuration(this.timeLeft)
              this.nextQusId = this.qusInfo[this.activequs].questionDetails._id;
              this.qusDuration = this.qusInfo[this.activequs].questionDetails.duration * 60;
              this.qusEndTime = new Date();
              this.actions('auto complete',true,'');
              this.countdownStart = null;
              setTimeout(() => {
                this.timeLeft =  this.qusInfo[this.activequs].questionDetails.duration * 60;
                this.getQusDuration(this.timeLeft)
                this.counterStart.begin();
               }, 0);
            }else {
              this.actions('submit',false,'')
              this.toast.warning('No Next question..')
            }
        }
        }


    getQusDuration(qustime){
      const duration = moment.duration(qustime, 'seconds');
      const resultstring = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
      this.qusTime = resultstring;
    }
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

  // previousQus(previousQus,status){
  //   if(this.isRecordStarted == true){
  //     this.isRecordStarted = false;
  //     this.qusEndDate = new Date();

  //     }else{
  //       this.qusStartDate = '';
  //     }
  //   this.isStartbtn = true; 
  //   if(previousQus > 0){
  //     this.qusDetails = this.qusInfo[previousQus].questionDetails._id;
  //     this.nextQusId = this.qusInfo[previousQus - 1].questionDetails._id;
  //     this.qusDuration = this.qusInfo[previousQus - 1].questionDetails.duration * 60;
  //     this.activequs = previousQus - 1;
  //     this.timeLeft =  this.qusInfo[this.activequs].questionDetails.duration * 60;
  //     this.actions(status,false, this.activequs);
  //   }else {
  //     this.toast.warning('No question to previous..')
  //   }
  // }


