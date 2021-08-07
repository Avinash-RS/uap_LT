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

  dbForm: FormGroup;
  hide = true;
  masterCollector = [
    {
      datasource: 'Campus',
      datatarget: 'UAP',
      description: 'Get candidate details',
      label: 'Get candidate details',
      type: 'sync',
      apiCall: ''
    },
    {
      datasource: 'TAO',
      datatarget: 'UAP',
      description: 'Get Test information',
      label: 'Get Test information',
      type: 'sync',
      apiCall: ''
    },
    {
      datasource: 'UAP',
      datatarget: 'TAO',
      description: 'Test Results',
      label: 'Test Results',
      type: 'sync',
      apiCall: ''
    },
    {
      datasource: 'WECP',
      datatarget: 'UAP',
      description: 'Import Test from WECP',
      label: 'Import Test from WECP',
      type: 'syncToNode',
      apiCall: 'testImport'
    },
    {
      datasource: 'WECP',
      datatarget: 'UAP',
      description: 'Import question and test details',
      label: 'Import question and test details',
      type: 'syncToNode',
      apiCall: 'testDetailsImport'
    },
    {
      datasource: 'WECP DB',
      datatarget: 'UAP DB',
      description: 'Test Sync WECP DB to UAP DB',
      label: 'Test Sync WECP DB to UAP DB',
      type: 'syncToNode',
      apiCall: 'wecpToUapTestImport'
    }
  ]
  constructor(
    private fb: FormBuilder,
    private syncService: SyncService,
    private toaster: ToastrService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {
    this.formInitialize();
  }
 
  reset() {
    this.dbForm.reset();
  }

  formInitialize() {
    this.dbForm = this.fb.group({
      'label': [{value: null, disabled: false}, [Validators.required, Validators.maxLength(255)]],
      'datasource': [{value: null, disabled: true}, [Validators.required, Validators.maxLength(255)]],
      'datatarget':[{value: null, disabled: true}, [Validators.required, Validators.maxLength(255)]],
      'description': [{value: null, disabled: true}, [Validators.maxLength(255)]]
    })
  }

  dbChange(e) {
    console.log('e', e);
    this.dbForm.patchValue({
      'datasource': e.value.datasource,
      'datatarget': e.value.datatarget,
      'description': e.value.description
    })
  }

  dbFormSubmit() {
  if (this.dbForm.valid) {    
    if (this.dbForm.value.label.apiCall == 'testImport') {
      return this.testImport();
    }

    if (this.dbForm.value.label.apiCall == 'testDetailsImport') {
      return this.testDetailsImport();
    }

    if (this.dbForm.value.label.apiCall == 'wecpToUapTestImport') {
      return this.wecpToUapTestImport();
    } else {
      return this.toaster.warning('Currently Syncing is not integrated for the selected action..');
    }
  }
}
   
  testImport() {
    let apiData = {
      "groupLimt": 5,
      "limit" : 200
  }
    this.syncService.testImport(apiData).subscribe((response: any)=> {
      if (response && response.success) {
        this.toaster.success(response && response.message ? response.message : 'Synced Successfully');
      } else {
        this.toaster.warning(response && response.message ? response.message : 'Having trouble on syncing data...');
      }
    }, (err)=> {
      this.toaster.warning('Having trouble on syncing data...');
    });
  }

  testDetailsImport() {
    let apiData = {
      "querylimit":4,
      "questionInsertLimit":100,
      "isFailed": false  
  }  
  this.syncService.testDetailsImport(apiData).subscribe((response: any)=> {
    if (response && response.success) {
      this.toaster.success(response && response.message ? response.message : 'Synced Successfully');
    } else {
      this.toaster.warning(response && response.message ? response.message : 'Having trouble on syncing data...');
    }
  }, (err)=> {
    this.toaster.warning('Having trouble on syncing data...');
  });
  }

  wecpToUapTestImport() {
    let apiData = {
      "limit" : 50
  }  
  this.syncService.wecpToUapTestImport(apiData).subscribe((response: any)=> {
    if (response && response.success) {
      this.toaster.success(response && response.message ? response.message : 'Synced Successfully');
    } else {
      this.toaster.warning(response && response.message ? response.message : 'Having trouble on syncing data...');
    }
  }, (err)=> {
    this.toaster.warning('Having trouble on syncing data...');
  });
  }

  //Form getters
  get label() {
    return this.dbForm.get('label');
  }
  get datasource() {
    return this.dbForm.get('datasource');
  }
  get datatarget() {
    return this.dbForm.get('datatarget');
  }
  get description() {
    return this.dbForm.get('description');
  }
  
}
