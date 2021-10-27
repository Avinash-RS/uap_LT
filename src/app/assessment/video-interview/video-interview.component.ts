import { Component, ElementRef, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { AssessmentAPIService } from 'src/app/rest-api/assessments-api/assessments-api.service';
import { UapHttpService } from 'src/app/rest-api/uap-http.service';
@Component({
  selector: 'uap-video-interview',
  templateUrl: './video-interview.component.html',
  styleUrls: ['./video-interview.component.scss']
})
export class VideoInterviewComponent implements OnInit {
  VideoToken: string;
  qusInfo:any = [];
  isStartbtn = true;
  countdown: number;
  countdownStart: number =0;
  firstQusTime:number;
  activequs = 0;
  proctorScreen :any;
  userProfile:any
  qusDetails: any;
  
  constructor(private httpClient: UapHttpService,private elementRef: ElementRef, private toast: ToastrService,private http : AssessmentAPIService) {
    this.proctorScreen = sessionStorage.getItem('smallScreen');
    this.userProfile = JSON.parse(sessionStorage.getItem('user'));
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
        this.countdown = this.firstQusTime * 60;
      }else {
        this.toast.warning('Please try after sometime...')
      }
    })
  }

  getTime(duration,index,activequs){
    this.activequs = index; // display active qus button
    this.isStartbtn = true; // start button enable disable
    this.countdown = parseInt(duration) * 60;  // convert mins into sec
    this.qusDetails = this.qusInfo[activequs+ 1].questionDetails;
  }

  startRecord(){
      this.isStartbtn = false;  // disable start button
  }

  nextQus(nextqus){
    this.isStartbtn = true; 
    this.countdown = 0;
    this.countdownStart = 0;
    if(this.qusInfo.length > nextqus){
      this.activequs = nextqus + 1;
      this.countdown =  this.qusInfo[nextqus+ 1].questionDetails.duration * 60;

    }else {
      // this.activequs = nextqus;
      this.toast.warning('No Next question..')
    }
   
  }

  skipQus(skipqus){
    this.isStartbtn = true; 
    if(this.qusInfo.length > skipqus){
      this.activequs = skipqus + 1;
      this.countdown =  this.qusInfo[skipqus+ 1].questionDetails.duration * 60;
    }else {
      this.toast.warning('No question to skip..')
    }
  }

  previousQus(previousQus){
    this.isStartbtn = true; 
    if(previousQus > 0){
        this.activequs = previousQus - 1;
        this.countdown =  this.qusInfo[previousQus - 1].questionDetails.duration * 60;
    }else {
      this.toast.warning('No question to previous..')
    }
  }


  // Ans record timer event

  onComplete($event){
      console.log($event,'oncomplete')
  }

  onTick($event){
    // console.log($event,'on tick')
  }

  onStart($event){
    console.log($event,'on start')
  }



  actions(){
      let req = {
        "scheduleId":sessionStorage.getItem('schuduleId'),
        "startTime": new Date(),
        "questionId":this.qusDetails._id,
        "emailId" : this.userProfile && this.userProfile.attributes && this.userProfile.attributes.email ? this.userProfile.attributes.email : null,
        "endTime":"2021-10-27T05:35:00.000Z",
        "action":"797",
        "recordedDuration":"12",
        "timeLeft":"3"
      }
    this.http.submitTestDetails(req).subscribe((response: any) => {


    })
  }

}
