import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SyncService } from 'src/app/rest-api/sync-apis/sync.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/rest-api/loading.service';
import { max } from 'moment';

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
  groupId:any;
  testId:any;
  filter = false;

  constructor(
    private fb: FormBuilder,
    private syncService: SyncService,
    private toaster: ToastrService,
  ) { }

  ngOnInit(): void {
    this.gmformInitialize();
    this.TestMasterInitialize();
    this.TestDetailsInitialize();
    this.TestQuestionDetailsInitalize();
    this.TestUAPImportInitalize();
    this.WECPScheduleInitalize();
    this.CheckSyncStatusInitalize();
    this.getOrgName({});
  }

  gmformInitialize() {
    this.groupMasterForm = this.fb.group({
      'gmOrgName': ['',[Validators.required]],
    })
  }

  
  TestMasterInitialize() {
    this.testMasterForm = this.fb.group({
      'tmOrgName': ['',[Validators.required]],
      'tmGroupId': ['',[Validators.required]],
    })
  }

  TestDetailsInitialize(){
    this.testDetailsForm = this.fb.group({
      'tdOrgName': ['',[Validators.required]],
      'tdGroupId': ['',[Validators.required]],
      'tdTestId': ['',[Validators.required]]
    })
  }

  TestQuestionDetailsInitalize(){
    this.testQuestionDetailsForm = this.fb.group({
      'tqOrgName': ['',[Validators.required]],
      'tqGroupId': ['',[Validators.required]],
      'tqTestId': ['',[Validators.required]],
      'tqLimit': ['',[Validators.required, Validators.max(100)]],
    })
  }


  // common for all org name
  getOrgName(data){
    this.syncService.getUapOrganizations(data ? data : {}).subscribe((response:any)=>{
      if (response && response.success) {
          this.orgName = response.data.orgDetails;
          this.groupId = response.data.groupDetails;
          this.testId = response.data.testDetails;
      } else {
        this.toaster.warning(response && response.message ? response.message : 'Having trouble on syncing data...');
      }
    },(err)=>{
      this.toaster.warning('Having trouble on syncing data...');
    })
  }

  // sync group master
  groupmasterImports(){
    this.filter = true;
    let data ={
      orgId:this.groupMasterForm ? this.groupMasterForm.value.gmOrgName : '',
    } 
    this.syncService.groupmasterImportApi(data).subscribe((response:any)=>{
      if (response && response.success) {
          this.toaster.success(response && response.message ? response.message : 'Syncing data...');
          this.filter = false;
          this.groupMasterForm.reset();
      } else {
        this.toaster.warning(response && response.message ? response.message : 'Having trouble on syncing data...');
        this.filter = false;
        this.groupMasterForm.reset();
      }
    },(err)=>{
      this.toaster.warning('Having trouble on syncing data...');
    })
  }


 // Test Master start
 testMasterOrg(orgId){
   let data = {
    wecpOrgId : orgId
   }
   this.getOrgName(data)
 }

  testDetailsOrg(){
    this.filter = true;
    let data ={
      orgId:this.testMasterForm ? this.testMasterForm.value.tmOrgName : '',
      groupIds: this.testMasterForm ? this.testMasterForm.value.tmGroupId : '',
      groupLimt: 10,
      limit: 50,
      groupOffset:0
    }
    this.syncService.testImport(data).subscribe((response:any)=>{
      if (response && response.success) {
        this.toaster.success(response && response.message ? response.message : 'Syncing data...');
        this.filter = false;
        this.testMasterForm.reset();
    } else {
      this.toaster.warning(response && response.message ? response.message : 'Having trouble on syncing data...');
      this.filter = false;
      this.testMasterForm.reset();
    }
  },(err)=>{
    this.toaster.warning('Having trouble on syncing data...');
  })
  }
  // Test Master End

  // Test Details start
  getTestDetailsOrg(orgId){
    let data = {
      wecpOrgId : orgId
     }
     this.getOrgName(data)
  }

  getTestId($event){
    let data = {
      wecpOrgId : this.testDetailsForm ? this.testDetailsForm.value.tdOrgName : '',
      groupIds: [$event ? $event.value : '']
     }
     this.getOrgName(data)
  }


  testDetailsImport(){
    this.filter = true;
    let data ={
      orgId:this.testDetailsForm ? this.testDetailsForm.value.tdOrgName : '',
      groupIds: [this.testDetailsForm ? this.testDetailsForm.value.tdGroupId : ''],
      testId: this.testDetailsForm ? this.testDetailsForm.value.tdTestId : '',
      querylimit: 100,
      questionInsertLimit: 100,
      isFailed: true
    }
    this.syncService.testDetailsImport(data).subscribe((response:any)=>{
      if (response && response.success) {
        this.toaster.success(response && response.message ? response.message : 'Syncing data...');
        this.filter = false;
        this.testDetailsForm.reset();
    } else {
      this.toaster.warning(response && response.message ? response.message : 'Having trouble on syncing data...');
      this.filter = false;
      this.testDetailsForm.reset();
    }
  },(err)=>{
    this.toaster.warning('Having trouble on syncing data...');
  })
  }
  // test Details End


  // Start Test Question Details
  getTestQuestionDetailsOrg(orgId){
    let data = {
      wecpOrgId : orgId
     }
     this.getOrgName(data)
  }

  getTestQuestionId($event){
    let data = {
      wecpOrgId : this.testQuestionDetailsForm ? this.testQuestionDetailsForm.value.tqOrgName : '',
      groupIds: [$event ? $event.value : '']
     }
     this.getOrgName(data)
  }

  TestQuestionDetailsImport(){
    this.filter = true;
    let data ={
      orgId:this.testQuestionDetailsForm ? this.testQuestionDetailsForm.value.tqOrgName : '',
      groupId: this.testQuestionDetailsForm ? this.testQuestionDetailsForm.value.tqGroupId : '',
      testId: this.testQuestionDetailsForm ? this.testQuestionDetailsForm.value.tqTestId : '',
      limit: this.testQuestionDetailsForm ? this.testQuestionDetailsForm.value.tqLimit : ''
    }
    this.syncService.testQuestionDetailsImport(data).subscribe((response:any)=>{
      if (response && response.success) {
        this.toaster.success(response && response.message ? response.message : 'Syncing data...');
        this.filter = false;
        this.testQuestionDetailsForm.reset();
    } else {
      this.toaster.warning(response && response.message ? response.message : 'Having trouble on syncing data...');
      this.filter = false;
      this.testQuestionDetailsForm.reset();
    }
  },(err)=>{
    this.toaster.warning('Having trouble on syncing data...');
  })
  }

  // End Test Question Details


  // Start WECP to UAP Import

  
  TestUAPImportInitalize(){
    this.wecpDetailsForm = this.fb.group({
      'uapOrgName': ['',[Validators.required]],
      'uapGroupId': ['',[Validators.required]],
      'uapTestId': ['',[Validators.required]],
      'uapLimit': ['',[Validators.required,Validators.max(100)]],
    })
  }
  getUAPImportOrg(orgId){
    let data = {
      wecpOrgId : orgId
     }
     this.getOrgName(data)
  }

  getUAPImportId($event){
    let data = {
      wecpOrgId : this.wecpDetailsForm ? this.wecpDetailsForm.value.uapOrgName : '',
      groupIds: [$event ? $event.value : '']
     }
     this.getOrgName(data)
  }

  WECPToUAPImport(){
    this.filter = true;
    let data ={
      orgId:this.wecpDetailsForm ? this.wecpDetailsForm.value.uapOrgName : '',
      groupId: this.wecpDetailsForm ? this.wecpDetailsForm.value.uapGroupId : '',
      testId: this.wecpDetailsForm ? this.wecpDetailsForm.value.uapTestId : '',
      limit: this.wecpDetailsForm ? this.wecpDetailsForm.value.uapLimit : ''
    }
    this.syncService.wecpToUapTestImport(data).subscribe((response:any)=>{
      if (response && response.success) {
        this.toaster.success(response && response.message ? response.message : 'Syncing data...');
        this.filter = false;
        this.wecpDetailsForm.reset();
    } else {
      this.toaster.warning(response && response.message ? response.message : 'Having trouble on syncing data...');
      this.filter = false;
      this.wecpDetailsForm.reset();
    }
  },(err)=>{
    this.toaster.warning('Having trouble on syncing data...');
  })
  }
  // End WECP to UAP Import

  // Start WECP Schedule sycn (Candidate)
  WECPScheduleInitalize(){
    this.WECPScheduleDetailsForm = this.fb.group({
      'WECPScheduleOrgName': ['',[Validators.required]],
      'WECPScheduleGroupId': ['',[Validators.required]],
      'WECPScheduleTestId': ['',[Validators.required]],
      'WECPScheduleLimit': ['',[Validators.required,Validators.max(100)]],
    })
  }

  getWECPScheduleOrg(orgId){
    let data = {
      wecpOrgId : orgId
     }
     this.getOrgName(data)
  }

  getWECPScheduleId($event){
    let data = {
      wecpOrgId : this.WECPScheduleDetailsForm ? this.WECPScheduleDetailsForm.value.WECPScheduleOrgName : '',
      groupIds: [$event ? $event.value : '']
     }
     this.getOrgName(data)
  }

  WECPScheduleImport(){
    this.filter = true;
    let data ={
      orgId:this.WECPScheduleDetailsForm ? this.WECPScheduleDetailsForm.value.WECPScheduleOrgName : '',
      groupId: this.WECPScheduleDetailsForm ? this.WECPScheduleDetailsForm.value.WECPScheduleGroupId : '',
      testId: this.WECPScheduleDetailsForm ? this.WECPScheduleDetailsForm.value.WECPScheduleTestId : '',
      limit: this.WECPScheduleDetailsForm ? this.WECPScheduleDetailsForm.value.WECPScheduleLimit : ''
    }
    this.syncService.wecpScheduleTestSync(data).subscribe((response:any)=>{
      if (response && response.success) {
        this.toaster.success(response && response.message ? response.message : 'Syncing data...');
        this.filter = false;
        this.WECPScheduleDetailsForm.reset();
    } else {
      this.toaster.warning(response && response.message ? response.message : 'Having trouble on syncing data...');
      this.filter = false;
      this.WECPScheduleDetailsForm.reset();
    }
  },(err)=>{
    this.toaster.warning('Having trouble on syncing data...');
  })
  }
  
  // End WECP Schedule sycn (Candidate)


  // Start Check Sync Status
  CheckSyncStatusInitalize(){
    this.CheckSyncDetailsForm = this.fb.group({
      'CheckSyncOrgName': ['',[Validators.required]],
      'CheckSyncGroupId': ['',[Validators.required]],
      'CheckSyncTestId': ['',[Validators.required]],
    })
  }

  getCheckSyncOrg(orgId){
    let data = {
      wecpOrgId : orgId
     }
     this.getOrgName(data)
  }

  getCheckSyncId($event){
    let data = {
      wecpOrgId : this.CheckSyncDetailsForm ? this.CheckSyncDetailsForm.value.CheckSyncOrgName : '',
      groupIds: [$event ? $event.value : '']
     }
     this.getOrgName(data)
  }

  CheckSyncStatus(){
    this.filter = true;
    let data ={
      orgId:this.CheckSyncDetailsForm ? this.CheckSyncDetailsForm.value.CheckSyncOrgName : '',
      groupId: this.CheckSyncDetailsForm ? this.CheckSyncDetailsForm.value.CheckSyncGroupId : '',
      testId: this.CheckSyncDetailsForm ? this.CheckSyncDetailsForm.value.CheckSyncTestId : '',
    }
    this.syncService.checkWECPSyncStatus(data).subscribe((response:any)=>{
      if (response && response.success) {
        this.toaster.success(response && response.message ? response.message : 'Syncing data...');
        this.filter = false;
        this.CheckSyncDetailsForm.reset();
    } else {
      this.toaster.warning(response && response.message ? response.message : 'Having trouble on syncing data...');
      this.filter = false;
      this.CheckSyncDetailsForm.reset();
    }
  },(err)=>{
    this.toaster.warning('Having trouble on syncing data...');
  })
  }

  // End Check Sync Status

  //Form getters
  get gmOrgName() {
    return this.groupMasterForm.get('gmOrgName');
  }
  get tmOrgName() {
    return this.testMasterForm.get('tmOrgName');
  }
  get tmGroupId() {
    return this.testMasterForm.get('tmGroupId');
  }
  get tdOrgName() {
    return this.testDetailsForm.get('tdOrgName');
  }
  get tdGroupId() {
    return this.testDetailsForm.get('tdGroupId');
  }
  get tdTestId() {
    return this.testDetailsForm.get('tdTestId');
  }

  get tqOrgName() {
    return this.testQuestionDetailsForm.get('tqOrgName');
  }
  get tqGroupId() {
    return this.testQuestionDetailsForm.get('tqGroupId');
  }
  get tqTestId() {
    return this.testQuestionDetailsForm.get('tqTestId');
  }
  get tqLimit() {
    return this.testQuestionDetailsForm.get('tqLimit');
  }

  get uapLimit() {
    return this.wecpDetailsForm.get('uapLimit');
  }

  get WECPScheduleLimit() {
    return this.WECPScheduleDetailsForm.get('WECPScheduleLimit');
  }


  
  


  get uapOrgName(){
    return this.testQuestionDetailsForm.get('uapOrgName');
  }

  
}
