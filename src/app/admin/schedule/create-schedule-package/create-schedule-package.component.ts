import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import * as ScheduleActions from '../redux/schedule.actions';
import {
  AssesmentPackagesModel,
  PackageResponse
} from 'src/app/rest-api/package-api/model/package-response.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  PackageDetailResponse,
  PackageDetailsData
} from 'src/app/rest-api/package-api/model/package-details.model';
import {
  CandidateInforamtion,
  CreateSchedulePackageFormModel
} from './create-schedule-package.model';
import { AdminUtils } from '../../admin.utils';
import {
  selectCreateScheduleAssessmentSnackBarMessage,
  selectPackageDetailsState,
  selectPackageListState
} from '../redux/schedule.reducers';
import { SchedulerReducerState } from '../redux/schedule.model';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { ScheduleRequest } from 'src/app/rest-api/schedule-api/models/schedule-assessment-request.model';
import {
  clearPackageDetailsState,
  initCreateScheduleAssessmentPackage
} from '../redux/schedule.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssessmentsModuleEnum } from '../../assessments/assessments.enums';
import { CustomSnackBarContentComponent } from 'src/app/shared/custom-snack-bar-content/custom-snack-bar-content.component';
import { ScheduleModuleEnum } from '../schedule.enums';
import { selectUserProfileData } from 'src/app/redux/user/user.reducer';
import { ScheduleAPIService } from 'src/app/rest-api/schedule-api/schedule-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-schedule-package',
  templateUrl: 'create-schedule-package.html',
  styleUrls: ['create-schedule-package.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateSchedulePackageComponent implements OnInit, OnDestroy {
  packageList: PackageResponse;
  // Form Fields
  schedulePackageForm: FormGroup;
  filteredOptions: Observable<AssesmentPackagesModel[]> | undefined;
  packageDetails: PackageDetailsData;
  scheduleDateTime: string;
  disableCreateButton = true;
  // Candidates Information
  toogleAddCandidateInfoButton: boolean;
  toogleUploadCsvButton: boolean;
  switchToAddEmailView: boolean;
  showCsvFileInformation: boolean;
  csvRows: Array<CandidateInforamtion[]> = [];
  csvFileName: string;
  invalidEmailsList: string[] = [];
  validEmailsList: CandidateInforamtion[] = [];
  duplicateEmailsListCount = 0;
  files: NgxFileDropEntry[] = [];
  scheduleDateTimeTimeStamp: string;
  // Snackbar
  displayMessage: string | undefined;
  requestPackageId: string | undefined;
  canCreateSchedule = false;
  selectedCSVFile: File;
  constructor(
    private fb: FormBuilder,
    private store: Store<SchedulerReducerState>,
    private adminUtils: AdminUtils,
    private scheduleService: ScheduleAPIService,
    private snackBar: MatSnackBar,
    private toaster: ToastrService
  ) {
    const today = new Date();
    const timeFormat = today.getHours() > 11 ? 'PM' : 'AM';
    const currentTime = `${today.getHours() % 12 || 12}:${today.getMinutes()} ${timeFormat}`;
    this.schedulePackageForm = this.fb.group({
      batchName: ['', Validators.required],
      scheduleDescription: ['', Validators.required],
      scheduleDate: [new Date(), Validators.required],
      scheduleTime: [currentTime, Validators.required],
      assessmentName: ['', Validators.required],
      candidatesInformation: this.fb.array([])
    });

    this.schedulePackageForm.valueChanges.subscribe(
      (getSchedulePackageForm: CreateSchedulePackageFormModel) => {
        const selectedDate: Date = getSchedulePackageForm.scheduleDate;
        this.scheduleDateTime =
          selectedDate.toString().substring(4, 15).replace(/\s/g, '-') +
          '  ' +
          this.schedulePackageForm.get('scheduleTime')?.value;
        const concatedDateTime = this.getConcatedDateTime(
          selectedDate,
          getSchedulePackageForm.scheduleTime
        );
        this.scheduleDateTimeTimeStamp = new Date(concatedDateTime).toISOString();
      }
    );
  }

  ngOnInit(): void {
    this.initializeCandidateInformatinView();
    this.packageListActionDispatcher();
    this.checkScheduleAccessStatus();
    this.store.select(selectPackageListState).subscribe((packageList: PackageResponse) => {
      this.packageList = packageList;
    });
    this.store
      .select(selectPackageDetailsState)
      .subscribe((getPackageDetail: PackageDetailResponse) => {
        this.packageDetails = getPackageDetail.data;
      });
    this.filteredOptions = this.schedulePackageForm.get('assessmentName')?.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.store
      .select(selectCreateScheduleAssessmentSnackBarMessage)
      .subscribe((message: string | undefined) => {
        this.displayMessage = message;
        if (this.getSavedOrFailedStatus(this.displayMessage)) {
          this.openSnackBar(this.displayMessage);
        }
      });
    this.schedulePackageForm.valueChanges.subscribe(() => {
      if (this.schedulePackageForm.valid) {
        this.disableCreateButton =
          !this.showCsvFileInformation && !this.getCandidatesInformation.length ? true : false;
      } else {
        this.disableCreateButton = true;
      }
    });
  }

  get getCandidatesInformation(): FormArray {
    return this.schedulePackageForm.get('candidatesInformation') as FormArray;
  }

  createCandidateInformation(): FormGroup {
    return this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  addNewCandidateInformation(): void {
    // Hide upload csv button
    this.toogleUploadCsvButton = false;
    this.getCandidatesInformation.push(this.createCandidateInformation());
  }

  deleteCandidateInformation(index: number): void {
    if (this.getCandidatesInformation.length === 1) {
      // Show upload csv button
      this.toogleUploadCsvButton = true;
    }
    this.getCandidatesInformation.removeAt(index);
  }

  onDateChanged(event: MatDatepickerInputEvent<Date>): void {
    this.schedulePackageForm.patchValue({ scheduleDate: event.value });
  }

  onTimeChanged(time: string): void {
    this.schedulePackageForm.patchValue({ scheduleTime: time });
  }

  getOptionSelectedData(selectedPackage: AssesmentPackagesModel): void {
    this.store.dispatch(
      ScheduleActions.initGetPackageDetails({
        payload: {
          packageId: selectedPackage.id.toString()
        }
      })
    );
  }

  private _filter(filterValue: string): AssesmentPackagesModel[] {
    return this.packageList.data.filter((option: AssesmentPackagesModel) =>
      option.attributes.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  packageListActionDispatcher(searchValue: string = ''): void {
    this.store.dispatch(
      ScheduleActions.getPackageList({
        payload: {
          pageMetaData: {
            limit: 30,
            nextOffset: 0,
            offset: 0
          },
          searchString: searchValue,
          status: AssessmentsModuleEnum.PublishedAssessmentStatus
        }
      })
    );
  }

  getConcatedDateTime(selectedDate: Date, scheduleTime: string): string {
    return (
      selectedDate.toString().substring(0, 15) + ' ' + this.adminUtils.timeConversion(scheduleTime)
    );
  }

  resetPackageDetails(): void {
    this.packageDetails = {
      id: 0,
      type: '',
      attributes: {
        name: '',
        description: '',
        status: '',
        type: '',
        level: '',
        duration: 0,
        usageCount: 0,
        updatedBy: '',
        updatedTime: '',
        tasks: []
      }
    };
  }

  parseCsvFile(csvFile: File): void {
    if (csvFile) {
      const file: File = csvFile;
      // File reader method
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const csv: any = reader.result;
        let allTextLines = [];
        allTextLines = csv.split(/\r|\n|\r/);
        const arrayLength = allTextLines.length;
        // Reading and createing table rows
        const rows: CandidateInforamtion[] = [];
        for (let i = 1; i < arrayLength - 1; i++) {
          const rowData = allTextLines[i].split(';')[0].split(',');
          if (rowData.length > 1) {
            rows.push({
              emailId: rowData[0],
              firstName: rowData[1],
              lastName: rowData[2]
            });
          }
        }
        this.csvRows.push(rows);
        // Check for valid emails, update if valid,invalid email exists
        rows.forEach((candidateInfo: CandidateInforamtion) => {
          this.validateEmailAndUpdateValidInvalidEmailList(candidateInfo);
          this.disableCreateButton = this.validEmailsList.length ? false : true;
        });
        this.findAndUpdateDuplicateEmailsList(rows);
      };
    }
  }

  fileDropped(files: NgxFileDropEntry[]): void {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log('file', file);
          this.selectedCSVFile = file;
          this.switchToAddEmailView = false;
          this.showCsvFileInformation = true;
          this.parseCsvFile(file);
          this.csvFileName = file.name;
        });
      } else {
        alert('Only Csv File can be selected');
      }
    }
  }

  onCsvButtonClick(): void {
    this.toogleAddCandidateInfoButton = false;
    this.switchToAddEmailView = true;
    this.toogleUploadCsvButton = false;
  }

  exitUploadMode(): void {
    this.toogleAddCandidateInfoButton = true;
    this.toogleUploadCsvButton = true;
    this.switchToAddEmailView = false;
  }

  validateEmailAndUpdateValidInvalidEmailList(candidateInfo: CandidateInforamtion): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(candidateInfo.emailId).toLowerCase())) {
      this.validEmailsList.push(candidateInfo);
    } else {
      this.invalidEmailsList.push(candidateInfo.emailId);
    }
    return re.test(String(candidateInfo.emailId).toLowerCase());
  }

  deleteCsvFile(): void {
    // Empty file contents
    this.csvRows = [];
    // Hide Csv file information
    this.showCsvFileInformation = false;
    // Show upload csv file and add candidate information button
    this.toogleUploadCsvButton = true;
    this.toogleAddCandidateInfoButton = true;
    this.invalidEmailsList = [];
    this.validEmailsList = [];
    this.duplicateEmailsListCount = 0;
  }

  initializeCandidateInformatinView(): void {
    this.switchToAddEmailView = false;
    this.toogleUploadCsvButton = true;
    this.toogleAddCandidateInfoButton = true;
    this.showCsvFileInformation = false;
  }

  findAndUpdateDuplicateEmailsList(totalRows: CandidateInforamtion[]): void {
    const uniqueEmails = [...new Set(totalRows.map((item: CandidateInforamtion) => item.emailId))];
    this.duplicateEmailsListCount = totalRows.length - uniqueEmails.length;
  }

  createSchedulePackage(): void {
    this.openSnackBar(ScheduleModuleEnum.CreatingScheduleAssessmentStatus);
    this.createScheduleFromEdgeService(this.getCreateSchedulePackageRequestPayload());
    // this.store.dispatch(
    //   initCreateScheduleAssessmentPackage({
    //     payload: {
    //       data: this.getCreateSchedulePackageRequestPayload()
    //     }
    //   })
    // );
  }

  createScheduleFromEdgeService(request) {
    if (request.data.attributes.candidateDetails.length > 0) {
      this.store.dispatch(
        initCreateScheduleAssessmentPackage({
          payload: {
            data: request
          }
        })
      );  
    } else {
      console.log('req', request, this.selectedCSVFile);
      request.data.attributes.candidateDetails = [];
      const fd = new FormData();
      fd.append('batchName', request.data.attributes.batchName);
      fd.append('candidateFile', this.selectedCSVFile);
      fd.append('candidateDetails', request.data.attributes.candidateDetails);
      fd.append('description', request.data.attributes.description);
      fd.append('duration', request.data.attributes.duration);
      fd.append('packageTemplateId', request.data.attributes.packageTemplateId);
      fd.append('scheduledAtTestLevel', request.data.attributes.scheduledAtTestLevel);
      fd.append('startDateTime', request.data.attributes.startDateTime);
     this.scheduleService.createSchedulePackageEdgeService(fd).subscribe((response: any)=> {
      console.log('res', response);
      if (response && response.success) {
        this.toaster.success('Schedule Created Successfully');
       } else {
         this.toaster.warning('Please Try again...', 'Something went wrong');
       }
     }, (err)=> {
      this.toaster.warning('Please Try again...', 'Something went wrong');
      console.log('res', err);
     }); 
    }
  }

  getCreateSchedulePackageRequestPayload(clearCandidateDetails: boolean = false): ScheduleRequest {
    return {
      data: {
        type: 'batchSchedule',
        attributes: {
          batchName: this.schedulePackageForm.get('batchName')?.value,
          description: this.schedulePackageForm.get('scheduleDescription')?.value,
          packageTemplateId: this.packageDetails.id,
          startDateTime: this.scheduleDateTimeTimeStamp,
          duration: this.packageDetails.attributes.duration,
          scheduledAtTestLevel: false,
          candidateDetails: clearCandidateDetails
            ? []
            : this.csvRows.length > 0
            ? []
            : this.getUniqueAndValidEmails(ScheduleModuleEnum.CustomUpload)
        }
      }
    };
  }

  getUniqueAndValidEmails(submitType: string): CandidateInforamtion[] {
    if (submitType.toLowerCase() === ScheduleModuleEnum.CsvUpload.toLocaleLowerCase()) {
      // Aggregate Emails from csv file
      return this.getUniqueCandidateInformation();
    } else {
      // Aggregate Emails from custom input fields
      this.getCandidatesInformation.value.forEach((candidateInfo: CandidateInforamtion) => {
        this.validateEmailAndUpdateValidInvalidEmailList(candidateInfo);
      });
      return this.getUniqueCandidateInformation();
    }
  }

  // filtering based on email
  getUniqueCandidateInformation(): CandidateInforamtion[] {
    const uniqueCandidateInformation = new Map<string, CandidateInforamtion>();
    this.validEmailsList.forEach((candidateInfo: CandidateInforamtion) => {
      if (!uniqueCandidateInformation.get(candidateInfo.emailId)) {
        uniqueCandidateInformation.set(candidateInfo.emailId, candidateInfo);
      }
    });
    return Array.from(uniqueCandidateInformation.values());
  }

  ngOnDestroy(): void {
    this.initializeCandidateInformatinView();
    this.store.dispatch(clearPackageDetailsState());
    this.packageListActionDispatcher();
  }

  openSnackBar(message: string | undefined): void {
    const snackBarRef = this.snackBar.openFromComponent(CustomSnackBarContentComponent, {
      duration: 2000,
      data: {
        displayMessage: message
      },
      verticalPosition: 'top',
      panelClass: ['snackbar']
    });
    // Once the snackbar is closed reset snackbarMessage to initial reducer state
    snackBarRef.afterDismissed().subscribe(() => {
      this.store.dispatch(
        ScheduleActions.resetCreateScheduleAsessmentPackageSnackBarMessage({
          payload: {
            snackbarMessage: ScheduleModuleEnum.CreatingScheduleAssessmentStatus
          }
        })
      );
    });
  }

  getSavedOrFailedStatus(meesage: string | undefined): boolean | undefined {
    if (
      this.displayMessage?.includes(ScheduleModuleEnum.FailedScheduleAssessmentStatus) ||
      this.displayMessage?.includes(ScheduleModuleEnum.CreatedScheduleAssessmentStatus)
    ) {
      return true;
    }
    return;
  }

  onSearchChange(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    if (searchValue.length === 0) {
      this.getCandidatesInformation.clear();
      // Setback to inital state when autocomplete field is cleared
      this.resetPackageDetails();
      this.packageListActionDispatcher();
      // Setting back to inital state
      this.initializeCandidateInformatinView();
    } else {
      // Get package list based on the user search
      this.packageListActionDispatcher(searchValue);
    }
  }

  validateFormField(formField: string): boolean {
    const scheduleField = this.schedulePackageForm.get(formField);
    if (scheduleField?.invalid && scheduleField?.touched) {
      return true;
    } else {
      return false;
    }
  }

  validateCandidateInput(index: number, candidateInput: string): boolean {
    const candidateField = this.schedulePackageForm
      .get('candidatesInformation')
      ?.get(index.toString())
      ?.get(candidateInput);
    if (candidateField?.hasError('required') && candidateField.touched) {
      return true;
    } else {
      return false;
    }
  }

  validateCandidateEmailInput(index: number): boolean {
    const emailField = this.schedulePackageForm
      .get('candidatesInformation')
      ?.get(index.toString())
      ?.get('emailId');
    if (emailField?.hasError('email')) {
      return true;
    } else {
      return false;
    }
  }

  checkScheduleAccessStatus(): void {
    this.store.select(selectUserProfileData).subscribe((profileResponse) => {
      profileResponse.attributes.organisations.forEach((organisations) => {
        organisations.roles.forEach((roles) => {
          roles.permissions.forEach((permissions) => {
            if (permissions.code === 'CSH') {
              this.canCreateSchedule = true;
            }
          });
        });
      });
    });
  }
}
