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
  firstQusTime:number;
  activequs = 0;
  proctorScreen :any;

  constructor(private httpClient: UapHttpService,private elementRef: ElementRef, private toast: ToastrService,private http : AssessmentAPIService) {
    // this.VideoToken = sessionStorage.getItem('videotoken');
    // var token = sessionStorage.getItem('videotoken');
    this.proctorScreen = sessionStorage.getItem('smallScreen');
    // console.log(this.VideoToken,'video token')
    // var decoded = jwt_decode(this.VideoToken);
    // this.getVideoAssesmentToken(decoded);
    // console.log(decoded,'Video Interview');
  }

  ngOnInit(): void {
    this.testInformation();
  }

  // getVideoAssesmentToken(task) {
  //   console.log(task,'Video Interview')
  //   if (task) {
  //     this.httpClient
  //       .getVideoAssesment('/generateProctorToken', task)
  //       .subscribe((response: any) => {
  //         if (response.success == true) {
  //         } else {
  //           this.toast.warning('Something went wrong... Please try after sometime');
  //         }
  //       });
  //   } else {
  //     this.toast.warning('Something went wrong... Please try after sometime');
  //   }
  // }

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

  getTime(duration,index){
    this.activequs = index; // display active qus border
    this.isStartbtn = true; // start button enable disable
    this.countdown = parseInt(duration) * 60;  // convert mins into sec
  }

  startRecord(){
      this.isStartbtn = false;  // disable start button
  }

  nextQus(nextqus){
    this.countdown = 0;
    if(this.qusInfo.length > nextqus){
      this.activequs = nextqus + 1;
      this.countdown =  this.qusInfo[nextqus+ 1].questionDetails.duration * 60;
    }else {
      // this.activequs = nextqus;
      this.toast.warning('No Next question..')
    }
   
  }

  skipQus(skipqus){
    if(this.qusInfo.length > skipqus){
      this.activequs = skipqus + 1;
      this.countdown =  this.qusInfo[skipqus+ 1].questionDetails.duration * 60;
    }else {
      this.toast.warning('No question to skip..')
    }
  }

  previousQus(previousQus){
    if(previousQus > 0){
        this.activequs = previousQus - 1;
        this.countdown =  this.qusInfo[previousQus - 1].questionDetails.duration * 60;
    }else {
      this.toast.warning('No question to previous..')
    }
  }
}
