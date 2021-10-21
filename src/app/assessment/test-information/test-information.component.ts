import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SentData } from 'src/app/rest-api/sendData';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'uap-test-information',
  templateUrl: './test-information.component.html',
  styleUrls: ['./test-information.component.scss']
})
export class TestInformationComponent implements OnInit {
  VideoToken: any;
  isShow = false;
  subscription: any;
  constructor(private router: Router) {
    this.checkToken();
  }

  ngOnInit(): void {
    this.checkToken();
  }

  checkToken() {
    this.VideoToken = sessionStorage.getItem('videotoken');
    var token = sessionStorage.getItem('videotoken');
    var decoded = jwt_decode(token);

    console.log(decoded);
    if (this.VideoToken) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  NavToVideo() {
    this.router.navigateByUrl('/landing/VideoAssesment');
  }
}
