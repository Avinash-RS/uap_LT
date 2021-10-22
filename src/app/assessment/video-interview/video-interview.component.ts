import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { UapHttpService } from 'src/app/rest-api/uap-http.service';

@Component({
  selector: 'uap-video-interview',
  templateUrl: './video-interview.component.html',
  styleUrls: ['./video-interview.component.scss']
})
export class VideoInterviewComponent implements OnInit {
  VideoToken: string;
  constructor(private httpClient: UapHttpService, private toast: ToastrService) {
    this.VideoToken = sessionStorage.getItem('videotoken');
    var token = sessionStorage.getItem('videotoken');
    var decoded = jwt_decode(token);
    this.getVideoAssesmentToken(decoded);
    console.log(decoded,'Video Interview');
  }

  ngOnInit(): void {}

  getVideoAssesmentToken(task) {
    if (task) {
      this.httpClient
        .getVideoAssesment('/generateProctorToken', task)
        .subscribe((response: any) => {
          if (response.success == true) {
            // sessionStorage.setItem('videotoken', response.proctorToken);
          } else {
            this.toast.warning('Something went wrong... Please try after sometime');
          }
        });
    } else {
      this.toast.warning('Something went wrong... Please try after sometime');
    }
  }
}
