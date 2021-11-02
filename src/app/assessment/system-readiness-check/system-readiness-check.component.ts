import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'uap-system-readiness-check',
  templateUrl: './system-readiness-check.component.html',
  styleUrls: ['./system-readiness-check.component.scss']
})
export class SystemReadinessCheckComponent implements OnInit {
  checkSystemCheck:any;
  constructor( private http:HttpClient, private router: Router, private toast: ToastrService,) { 
  }

  ngOnInit(): void {
  }

  navtoVideo(){
    this.checkSystemCheck = sessionStorage.getItem('smallScreen');
    if(this.checkSystemCheck == 'true'){
      this.router.navigate(['/landing/TestInformation']);
    }else {
      this.toast.warning('Please wait while the system check your computer and the network')
    }
  
  }

}
