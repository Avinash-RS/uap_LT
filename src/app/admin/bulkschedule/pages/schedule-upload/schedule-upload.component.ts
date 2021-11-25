import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ScheduleAPIService } from 'src/app/rest-api/schedule-api/schedule-api.service';

@Component({
  selector: 'uap-schedule-upload',
  templateUrl: './schedule-upload.component.html',
  styleUrls: ['./schedule-upload.component.scss']
})
export class ScheduleUploadComponent implements OnInit {
  bulkscheduleForm: FormGroup;
  listOfOrg: any;
  constructor( private fb: FormBuilder,  private scheduleService: ScheduleAPIService, private toaster: ToastrService,) { 
    this.bulkscheduleForm = this.fb.group({
      batchName: ['', Validators.required],
      scheduleDescription: ['', Validators.required],
      assessmentName: ['', Validators.required],
      orgId:['', Validators.required],
    });
    this.getWEPCOrganizationList();
  }

  ngOnInit(): void {
  }

  validateFormField(formField: string): boolean {
    const scheduleField = this.bulkscheduleForm.get(formField);
    if (scheduleField?.invalid && scheduleField?.touched) {
      return true;
    } else {
      return false;
    }
  }

  getWEPCOrganizationList(){
    this.scheduleService.getWEPCOrganization({}).subscribe((response: any)=> {
      if(response.success){
         this.listOfOrg = response.data;
      }else {
        this.toaster.warning('Please Try again...', 'Something went wrong');
      }
    })
  }

}
