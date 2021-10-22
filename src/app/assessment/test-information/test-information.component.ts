import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SentData } from 'src/app/rest-api/sendData';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { UapHttpService } from 'src/app/rest-api/uap-http.service';
@Component({
  selector: 'uap-test-information',
  templateUrl: './test-information.component.html',
  styleUrls: ['./test-information.component.scss']
})
export class TestInformationComponent implements OnInit {
  VideoToken: any;
  isShow = false;
  subscription: any;
  constructor(private router: Router,private httpClient: UapHttpService,private toast: ToastrService) {
    this.checkToken();
  }

  ngOnInit(): void {
    this.checkToken();
  }

  checkToken() {
    this.VideoToken = sessionStorage.getItem('videotoken');
    var token = sessionStorage.getItem('videotoken');
    var decoded = jwt_decode(token);
    this.getVideoAssesmentToken(decoded)
    console.log(decoded,'Test Information');
    if (this.VideoToken) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

    getVideoAssesmentToken(task) {
    if (task) {
      this.httpClient
        .getVideoAssesment('/generateProctorToken', task)
        .subscribe((response: any) => {
          if (response.success == true) {
            sessionStorage.setItem('videotoken', response.proctorToken);
          } else {
            this.toast.warning('Something went wrong... Please try after sometime');
          }
        });
    } else {
    }
  }

  NavToVideo() {
    this.router.navigateByUrl('/landing/VideoAssesment');
  }
}
