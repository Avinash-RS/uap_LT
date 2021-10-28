import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  nextQusId: any;
  
  constructor(private route: Router,private httpClient: UapHttpService,private dialog: MatDialog, private toast: ToastrService,private http : AssessmentAPIService) {
    this.proctorScreen = sessionStorage.getItem('smallScreen');
    this.userProfile = JSON.parse(sessionStorage.getItem('user'));
  }

  ngOnInit(): void {
    this.testInformation();
    // sessionStorage.setItem("smallScreen", 'true')
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
  }

 
  nextQus(nextqus,status){
    this.actions(status);
    this.isStartbtn = true; 
    this.countdown = 0;
    this.countdownStart = 0;
    if(this.qusInfo.length > nextqus){
      this.activequs = nextqus + 1;
      this.countdown =  this.qusInfo[nextqus+ 1].questionDetails.duration * 60;
      this.nextQusId = this.qusInfo[nextqus+ 1].questionDetails._id;

    }else {

      this.toast.warning('No Next question..')
    }
   
  }

  skipQus(skipqus,status){
    this.actions(status);
    this.isStartbtn = true; 
    if(this.qusInfo.length > skipqus){
      this.activequs = skipqus + 1;
      this.countdown =  this.qusInfo[skipqus+ 1].questionDetails.duration * 60;
      this.nextQusId = this.qusInfo[skipqus+ 1].questionDetails._id;
    }else {
      this.toast.warning('No question to skip..')
    }
  }

  previousQus(previousQus,status){
    this.actions(status);
    this.isStartbtn = true; 
    if(previousQus > 0){
        this.activequs = previousQus - 1;
        this.countdown =  this.qusInfo[previousQus - 1].questionDetails.duration * 60;
        this.nextQusId = this.qusInfo[previousQus+ 1].questionDetails._id;
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
            this.countdown = 0;
            this.countdownStart = 0;
            this.activequs = nextqus + 1;
            this.countdown =  this.qusInfo[nextqus+ 1].questionDetails.duration * 60;
            this.nextQusId = this.qusInfo[nextqus+ 1].questionDetails._id;
      
          }else {
            this.toast.warning('No Next question..')
          }

      }

  }

  onTick($event){
    // console.log($event,'on tick')
  }

  onStart($event){
    console.log($event,'on start')
  }

  startRecord(activequs,stauts){
    this.qusDetails = this.qusInfo[activequs].questionDetails._id;
    this.isStartbtn = false;  // disable start button
    this.actions(stauts);
}


onSubmit(activequs,stauts){
  this.qusDetails = this.qusInfo[activequs].questionDetails._id;
  this.actions(stauts);
}



  actions(status){
    let request;
    if(status == 'start'){
      request = {
        "scheduleId": sessionStorage.getItem('schuduleId'),
        "startTime": new Date(),
        "questionId":this.qusDetails ? this.qusDetails : '',
        "emailId" : this.userProfile && this.userProfile.attributes && this.userProfile.attributes.email ? this.userProfile.attributes.email : null,
        "action": status,
      }
    } else{
      request = {
        "scheduleId": sessionStorage.getItem('schuduleId'),
        "endTime": new Date(),
        "questionId":this.qusDetails ? this.qusDetails : '',
        "nextQuestionId": this.nextQusId ? this.nextQusId : '',
        "emailId" : this.userProfile && this.userProfile.attributes && this.userProfile.attributes.email ? this.userProfile.attributes.email : null,
        "action": status,
      }

    }
        this.http.submitTestDetails(request).subscribe((response: any) => {
          if(response.success == true){
              if(request.action == 'submit'){
                  this.openDialog()
              }
          }else{
              // this.toast.warning('Please try after sometimes')
          }

        })
    }



    openDialog() {
      const dialogRef = this.dialog.open(this.matDialogRef1,{
        width: '572px',
        height: '286px',
      });
    }

    navToLanding(){
      this.route.navigate(['/landing/assessment', sessionStorage.getItem('assessmentId')])
    }

}
