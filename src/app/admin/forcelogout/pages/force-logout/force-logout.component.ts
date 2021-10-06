import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SyncService } from 'src/app/rest-api/sync-apis/sync.service';

@Component({
  selector: 'uap-force-logout',
  templateUrl: './force-logout.component.html',
  styleUrls: ['./force-logout.component.scss']
})
export class ForceLogoutComponent implements OnInit {
  dbForm: FormGroup;
  constructor(private fb: FormBuilder,private syncService: SyncService,
    private toaster: ToastrService,) { }

  ngOnInit(): void {
    this.formInitialize();
  }


  formInitialize() {
    this.dbForm = this.fb.group({
      'email': ['',[Validators.required, Validators.email]],
    })
  }

  get email() {
    return this.dbForm.get('email');
  }

  forcelogout() {
    let data = {
      email: this.dbForm.value.email.trim()
    }
    this.syncService.forcelogout(data).subscribe((response: any)=> {
          if(response.success == true){
              this.toaster.success(response.message);
              this.dbForm.reset();
          }else {
            this.toaster.warning(response.message.email.message);
          }
    }, (err)=> {
      this.toaster.warning('Having trouble on loggingout...');
    });
  }

}
