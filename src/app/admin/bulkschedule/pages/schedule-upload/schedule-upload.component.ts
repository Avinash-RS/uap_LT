import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
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
  files: NgxFileDropEntry[] = [];
  selectedCSVFile: File;
  csvFileName: string;
  csvRows: Array<any[]> = [];
  showCsvFileInformation: boolean;
  orginfo: any = [];
  constructor(  private router: Router,private fb: FormBuilder,  private scheduleService: ScheduleAPIService, private toaster: ToastrService,) { 
    this.bulkscheduleForm = this.fb.group({
      batchName: ['', Validators.required],
      scheduleDescription: ['', Validators.required],
      orgId:['', Validators.required],
    });
    this.getWEPCOrganizationList();
  }

  ngOnInit(): void {
  }

  
  fileDropped(files: NgxFileDropEntry[]): void {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.selectedCSVFile = file;
          // console.log(this.selectedCSVFile)
          // this.switchToAddEmailView = false;
          this.showCsvFileInformation = true;
          this.parseCsvFile(file);
          this.csvFileName = file.name;
        });
      } else {
        alert('Only Csv File can be selected');
      }
    }
  }

  parseCsvFile(csvFile: File): void {
    if (csvFile) {
      const file: File = csvFile;
      // File reader method
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const csv: any = reader.result;
        // console.log(csv)
        let allTextLines = [];
        allTextLines = csv.split(/\r|\n|\r/);
        const arrayLength = allTextLines.length;
        // Reading and createing table rows
        const rows: any[] = [];
        const firstRow = allTextLines[0].split(',');
        const validRows = allTextLines.filter(ele => ele);
        // 1001 with headers
        // if (validRows && validRows.length <= 1001) {
        if (firstRow[0] == 'emailId' && firstRow[2] == 'firstName' && firstRow[3] == 'lastName' && firstRow[4] == 'assessmentPackName' && firstRow[5] == 'startDateTime' && firstRow[6] == 'endDateTime' && firstRow[7] == 'instanceId') {
          for (let i = 1; i < arrayLength - 1; i++) {
            const rowData = allTextLines[i].split(';')[0].split(',');
            if (rowData.length > 1) {
                rows.push({
                  emailId: rowData[0] ? rowData[0].trim() : "",
                  password:rowData[1] ? rowData[1].trim() : "",
                  firstName: rowData[2] ? rowData[2].trim() : "",
                  lastName: rowData[3] ? rowData[3].trim() : "",
                  assessmentPackName: rowData[4] ? rowData[4].trim() : "",
                  startDateTime: rowData[5] ? rowData[5].trim() : "",
                  endDateTime: rowData[6] ? rowData[6].trim() : "",
                  instanceId: rowData[7] ? rowData[7].trim() : "",
                  driveName: rowData[8] ? rowData[8].trim() : "",
                  shortListName: rowData[9] ? rowData[9].trim() : "",
                  discipline: rowData[10] ? rowData[10].trim() : "",
                  specialization: rowData[11] ? rowData[11].trim() : "",
                  isProctor: rowData[12] ? rowData[12].trim() : "",
                  // publishDate: rowData[13] ? rowData[13].trim():"",
                  // is_published : rowData[14] ? rowData[14].trim():"",

                });
            }
          }
        } else {
          this.toaster.warning('Please fill all mandatory fields');
          this.deleteCsvFile();
        }
      // } else {
      //   this.toaster.warning('Cannot upload more than 1000 candidate');
      //   this.deleteCsvFile();
      // }
        this.csvRows.push(rows);
        // console.
      };
    }

  }

  deleteCsvFile(): void {
    // Empty file contents
    this.csvRows = [];
    // Hide Csv file information
    this.showCsvFileInformation = false;
    // Show upload csv file and add candidate information button
  }

  exitUploadMode(): void {
    // this.toogleAddCandidateInfoButton = true;
    // this.toogleUploadCsvButton = true;
    // this.switchToAddEmailView = false;
  }

  downloadTemplate() {
    const excel = `assets/templates/schedule.csv`;
    window.open(excel, '_blank');
  }


  validateFormField(formField: string): boolean {
    const scheduleField = this.bulkscheduleForm.get(formField);
    if (scheduleField?.invalid && scheduleField?.touched) {
      return true;
    } else {
      return false;
    }
  }

  isAssessmentPackageInvalid(): boolean {
    return !(this.bulkscheduleForm.valid);
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


  orgChange(orgInfo:any){
    if(orgInfo){
      this.orginfo = orgInfo;
    }
}

  bulkSchedule(){
      const fd = new FormData();
      fd.append('candidateFile',  this.selectedCSVFile);
      fd.append('scheduleName', this.bulkscheduleForm.get('batchName')?.value,);
      fd.append('description',  this.bulkscheduleForm.get('scheduleDescription')?.value);
      fd.append('orgId', this.bulkscheduleForm.get('orgId')?.value);
      fd.append('mimetype',  this.selectedCSVFile.type);
      fd.append('orgName',  this.orginfo.name ? this.orginfo.name : '');
      fd.append('supportEmail',  this.orginfo.supportEmail ? this.orginfo.supportEmail : '');
      fd.append('supportPhone',  this.orginfo.supportPhone ? this.orginfo.supportPhone : '');
    // let data = {
    //   "scheduleName" : this.bulkscheduleForm.get('batchName')?.value,
    //   "description" : this.bulkscheduleForm.get('scheduleDescription')?.value,
    //   "orgId" :this.bulkscheduleForm.get('orgId')?.value,
    //   "scheduleDetails" : this.csvRows[0]
    // }
    this.scheduleService.bulkschedule(fd).subscribe((response: any)=> {
     if(response.success){
      this.csvFileName = '';
      this.showCsvFileInformation = false;
      this.csvRows = [];
      this.bulkscheduleForm.reset();
      this.router.navigate(['/admin/schedule/list']);
        this.toaster.success(response.message);
     }else{
        this.toaster.warning(response.message);
     }
    })

  }



}
