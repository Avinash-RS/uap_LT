import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SyncService } from 'src/app/rest-api/sync-apis/sync.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/rest-api/loading.service';

@Component({
  selector: 'uap-results-sync',
  templateUrl: './results-sync.component.html',
  styleUrls: ['./results-sync.component.scss']
})
export class ResultsSyncComponent implements OnInit {
  groupMasterForm: FormGroup;
  testMasterForm:FormGroup;
  testDetailsForm:FormGroup;
  testQuestionDetailsForm:FormGroup;
  wecpDetailsForm:FormGroup;
  WECPScheduleDetailsForm:FormGroup;
  CheckSyncDetailsForm:FormGroup;
  orgName:any;
  filter = false;

  constructor(
    private fb: FormBuilder,
    private syncService: SyncService,
    private toaster: ToastrService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {
    this.formInitialize();
    this.getOrgName();
  }

  formInitialize() {
    this.groupMasterForm = this.fb.group({
      'gmOrgName': ['',[Validators.required]],
    })
  }

  getOrgName(){
    this.syncService.getUapOrganizations().subscribe((response:any)=>{
      if (response && response.success) {
          this.orgName = response.data;
      } else {
        this.toaster.warning(response && response.message ? response.message : 'Having trouble on syncing data...');
      }
    },(err)=>{
      this.toaster.warning('Having trouble on syncing data...');
    })
  }

  groupmasterImports(){
    this.filter = true;
    let data = {
      orgId:this.groupMasterForm.value.gmOrgName
    }
    this.syncService.groupmasterImportApi(data).subscribe((response:any)=>{
      if (response && response.success) {
          this.toaster.warning(response && response.message ? response.message : 'Having trouble on syncing data...');
          this.filter = false;
      } else {
        this.toaster.warning(response && response.message ? response.message : 'Having trouble on syncing data...');
        this.filter = false;
      }
    },(err)=>{
      this.toaster.warning('Having trouble on syncing data...');
    })

  }

   
  //Form getters
  get gmOrgName() {
    return this.groupMasterForm.get('gmOrgName');
  }

  // testImport() {
  //   let apiData = {
  //     "groupLimt": 5,
  //     "limit" : 200
  // }
  //   this.syncService.testImport(apiData).subscribe((response: any)=> {
  //     if (response && response.success) {
  //       this.toaster.success(response && response.message ? response.message : 'Synced Successfully');
  //     } else {
  //       this.toaster.warning(response && response.message ? response.message : 'Having trouble on syncing data...');
  //     }
  //   }, (err)=> {
  //     this.toaster.warning('Having trouble on syncing data...');
  //   });
  // }

  // groupMasterImport() {
  //   this.syncService.groupMasterImport().subscribe((response: any)=> {
  //     if (response && response.success) {
  //       this.toaster.success(response && response.message ? response.message : 'Synced Successfully');
  //     } else {
  //       this.toaster.warning(response && response.message ? response.message : 'Having trouble on syncing data...');
  //     }
  //   }, (err)=> {
  //     this.toaster.warning('Having trouble on syncing data...');
  //   });
  // }
  // testDetailsImport() {
  //   let apiData = {
  //     "querylimit":4,
  //     "questionInsertLimit":100,
  //     "isFailed": false  
  // }  
  // this.syncService.testDetailsImport(apiData).subscribe((response: any)=> {
  //   if (response && response.success) {
  //     this.toaster.success(response && response.message ? response.message : 'Synced Successfully');
  //   } else {
  //     this.toaster.warning(response && response.message ? response.message : 'Having trouble on syncing data...');
  //   }
  // }, (err)=> {
  //   this.toaster.warning('Having trouble on syncing data...');
  // });
  // }

  // wecpToUapTestImport() {
  //   let apiData = {
  //     "limit" : 50
  // }  
  // this.syncService.wecpToUapTestImport(apiData).subscribe((response: any)=> {
  //   if (response && response.success) {
  //     this.toaster.success(response && response.message ? response.message : 'Synced Successfully');
  //   } else {
  //     this.toaster.warning(response && response.message ? response.message : 'Having trouble on syncing data...');
  //   }
  // }, (err)=> {
  //   this.toaster.warning('Having trouble on syncing data...');
  // });
  // }


}
