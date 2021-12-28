import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/rest-api/loading.service';

@Component({
  selector: 'uap-system-readiness-check',
  templateUrl: './system-readiness-check.component.html',
  styleUrls: ['./system-readiness-check.component.scss']
})
export class SystemReadinessCheckComponent implements OnInit {
  checkSystemCheck:any;
  interval;
  @ViewChild('matDialog', {static: false}) matDialogRef: TemplateRef<any>;
  isfinish: any;
  isSystemCheckDone: any;
  showFinish:any;
  constructor( private route: Router,private _loading: LoadingService, private http:HttpClient,public matDialog: MatDialog, private router: Router, private toast: ToastrService,) { 
    this.checkSystemCheck = localStorage.getItem('smallScreen');
    this.isfinish = sessionStorage.getItem('enableFinish');
    this.isSystemCheckDone = localStorage.getItem('SCfinish');
    this.checkSystemcheckStatus();
  }

  ngOnInit(): void {
    this.checkSystemCheck = localStorage.getItem('smallScreen');
      setTimeout(() => {
        if(this.isSystemCheckDone == 'false'){
          this.open();
          this._loading.setLoading(false, 'request.url');
        }else{
          this._loading.setLoading(false, 'request.url');
          this.route.navigate(['/landing/assessment', sessionStorage.getItem('assessmentId')]);
        }
      }, 100);
  }


  checkSystemcheckStatus(){
    this.interval =   setInterval(()=>{
      this.isfinish = sessionStorage.getItem('enableFinish');
      if(this.isfinish == 'true'){
        this.navtoVideo();
      }
    },1000)
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    }

  navtoVideo(){
    this.checkSystemCheck = localStorage.getItem('smallScreen');
    if(this.checkSystemCheck == 'true'){
      this.matDialog.closeAll();
      this.router.navigate(['/landing/TestInformation']);
      clearInterval(this.interval);
      localStorage.setItem('SCfinish','ture');
    }else {
      this.toast.warning('Please wait while the system check your computer and the network');
      localStorage.setItem('SCfinish','false');
    }
  
  }

  open(){
    const dialogRef = this.matDialog.open(this.matDialogRef, {
      width: '89vw',
      height: '550px',
      disableClose: true,
    });
  }

}
