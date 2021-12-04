import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UapHttpService } from 'src/app/rest-api/uap-http.service';
import { AssessmentAPIService } from 'src/app/rest-api/assessments-api/assessments-api.service';
import { LoadingService } from 'src/app/rest-api/loading.service';
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
  testname: any;
  isChecked:any;
  isStartenable = true;
  activequs: any;
  isresume: any;
  constructor(private _loading: LoadingService,private router: Router,private httpClient: UapHttpService,private toast: ToastrService,private http : AssessmentAPIService) {
    this.checkToken();
    this.proctorScreen = sessionStorage.getItem('smallScreen');
    this.activequs = localStorage.getItem('activequs');
    this.isresume =  localStorage.getItem('resumeTest') ? localStorage.getItem('resumeTest') : 'false'
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
        this._loading.setLoading(false, 'request.url');
        this.testInfo = response.data[0].testDetailsArray[0];
        this.testname = response.data[0].scheduleDetailsArray[0].title ?  response.data[0].scheduleDetailsArray[0].title : '';
      }else {
        this.toast.warning('Please try after sometime...');
        this._loading.setLoading(false, 'request.url');
      }
    })
  }

  NavToVideo() {
    localStorage.setItem('activequs',this.activequs ? this.activequs : 0)
    this.router.navigateByUrl('/landing/VideoAssesment');
  }

  checkvalue(event){
    if(event.target.checked == true){
        this.isStartenable = false;
        localStorage.setItem('resumeTest','ture')

    }else {
      this.isStartenable = true;
      localStorage.setItem('resumeTest','false')
    }
  }
}
