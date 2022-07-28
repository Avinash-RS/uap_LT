import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { AssessmentAPIService } from 'src/app/rest-api/assessments-api/assessments-api.service';
import { Papa } from 'ngx-papaparse';
@Component({
  selector: 'uap-question-upload',
  templateUrl: './question-upload.component.html',
  styleUrls: ['./question-upload.component.scss']
})
export class QuestionUploadComponent implements OnInit {
  files: NgxFileDropEntry[] = [];
  selectedCSVFile: File;
  csvFileName: string;
  csvRows: any= [];
  showCsvFileInformation: boolean;
  userInfo: any

  constructor(private http: AssessmentAPIService, private toaster: ToastrService, private papa: Papa) {
    const userProfile = JSON.parse(sessionStorage.getItem('user'));
    this.userInfo = {
      firstName: userProfile && userProfile.attributes && userProfile.attributes.firstName
    }
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
          // this.switchToAddEmailView = false;
          this.showCsvFileInformation = true;
          this.handleFileSelect(file);
          this.csvFileName = file.name;
        });
      } else {
        alert('Only Csv File can be selected');
      }
    }
  }

  handleFileSelect(evt : File) {
    var files = evt; // FileList object
    var file = files;
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      var csv = event.target.result; // Content of CSV file
      this.papa.parse(csv, {
        skipEmptyLines: true,
        header: true,
        complete: (results) => {
          if (results && results.data.length <= 1001) {
          // for (let i = 0; i < results.data.length; i++) {
            // let orderDetails = {
            //   question: results ? results.data[i].question.trim() : "",
            //   duration: results ? results.data[i].duration.trim() : "",
            //   mark: results ? results.data[i].mark.trim() : "",
            //   categoryName: results ? results.data[i].categoryName.trim() : "",
            //   createdBy: this.userInfo.firstName ? this.userInfo.firstName : "",
            //   updatedBy: this.userInfo.firstName ? this.userInfo.firstName : "",
            // };
            // this.csvRows.push(orderDetails);
          // } 
        }else{
          this.toaster.warning('Cannot upload more than 1000 questions');
              this.deleteCsvFile();
        }
          this.csvRows.push(results.data);
        }
      });
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
    const excel = `assets/templates/questionmaster.csv`;
    window.open(excel, '_blank');
  }


  questionbulkUpload() {
    // const fd = new FormData();
    // fd.append('file', this.selectedCSVFile);
    let data = {
      "quesetionDetails": this.csvRows[0]
    }
    this.http.questionupload(data).subscribe((response: any) => {
      if (response.success == true) {
        this.csvFileName = '';
        this.showCsvFileInformation = false;
        this.csvRows = [];
        this.toaster.success(response.message);
      } else {
        this.toaster.error(response.message);
        this.csvFileName = '';
        this.showCsvFileInformation = false;
        this.csvRows = [];
      }
    })
  }
}
