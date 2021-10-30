import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  subscription: any;
  testInfo:any = [];
  proctorScreen: any;
  constructor(private router: Router,private httpClient: UapHttpService,private toast: ToastrService,private http : AssessmentAPIService) {
    this.checkToken();
    this.proctorScreen = sessionStorage.getItem('smallScreen');
    // console.log(typeof(this.proctorScreen) )
  }

  ngOnInit(): void {
    this.checkToken();
    this.testInformation();
  }

  checkToken() {
    this.VideoToken = sessionStorage.getItem('videotoken');
  }

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
