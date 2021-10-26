import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SentData } from 'src/app/rest-api/sendData';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { UapHttpService } from 'src/app/rest-api/uap-http.service';
import { AssessmentAPIService } from 'src/app/rest-api/assessments-api/assessments-api.service';
@Component({
  selector: 'uap-test-information',
  templateUrl: './test-information.component.html',
  styleUrls: ['./test-information.component.scss']
})
export class TestInformationComponent implements OnInit {
  VideoToken: any;
  isShow = false;
  subscription: any;

  testInfo:any = [];
  proctorScreen: any;
  constructor(private router: Router,private httpClient: UapHttpService,private toast: ToastrService,private http : AssessmentAPIService) {
    this.checkToken();
  }

  ngOnInit(): void {
    this.checkToken();
    this.testInformation();
  }

  checkToken() {
    this.VideoToken = sessionStorage.getItem('videotoken');
    this.proctorScreen = sessionStorage.getItem('smallScreen');
    // var decoded = jwt_decode(this.VideoToken);
    // this.getVideoAssesmentToken(decoded)
    // console.log(decoded,'Test Information');
    if (this.VideoToken) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  //   getVideoAssesmentToken(task) {
  //     console.log(task,'Test Information')
  //   if (task) {
  //     this.httpClient
  //       .getVideoAssesment('/generateProctorToken', task)
  //       .subscribe((response: any) => {
  //         if (response.success == true) {
  //           sessionStorage.setItem('videotoken', response.proctorToken);
  //         } else {
  //           this.toast.warning('Something went wrong... Please try after sometime');
  //         }
  //       });
  //   } else {
  //   }
  // }

  testInformation(){
    let data = {
      scheduleId : sessionStorage.getItem('schuduleId')
    }
    this.http.getTestInformation(data).subscribe((response: any) => {
      if(response.success == true){
        this.testInfo = response.data[0].testDetailsArray[0];
      }else {
        this.toast.warning('Please try after sometime...')
      }
    })
  }

  NavToVideo() {
    this.router.navigateByUrl('/landing/VideoAssesment');
  }
}
