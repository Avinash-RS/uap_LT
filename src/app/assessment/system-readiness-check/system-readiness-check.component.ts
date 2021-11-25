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
  @ViewChild('matDialog', {static: false}) matDialogRef: TemplateRef<any>;
  constructor(private _loading: LoadingService, private http:HttpClient,public matDialog: MatDialog, private router: Router, private toast: ToastrService,) { 
    this.checkSystemCheck = sessionStorage.getItem('smallScreen');
    
  }

  ngOnInit(): void {
    this.checkSystemCheck = sessionStorage.getItem('smallScreen');
      setTimeout(() => {
        this.open();
        this._loading.setLoading(false, 'request.url');
      }, 100);
  }

  navtoVideo(){
    this.checkSystemCheck = sessionStorage.getItem('smallScreen');
    if(this.checkSystemCheck == 'true'){
      this.matDialog.closeAll();
      this.router.navigate(['/landing/TestInformation']);
    }else {
      this.toast.warning('Please wait while the system check your computer and the network')
    }
  
  }

  open(){
    const dialogRef = this.matDialog.open(this.matDialogRef, {
      width: '200vh',
      height: '550px',
      disableClose: true,
    });
  }

}
