import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { AssessmentAPIService } from 'src/app/rest-api/assessments-api/assessments-api.service';
@Component({
  selector: 'uap-question-upload',
  templateUrl: './question-upload.component.html',
  styleUrls: ['./question-upload.component.scss']
})
export class QuestionUploadComponent implements OnInit {
  files: NgxFileDropEntry[] = [];
  selectedCSVFile: File;
  csvFileName: string;
  csvRows: Array<any[]> = [];
  showCsvFileInformation: boolean;
  userInfo:any

  constructor(private http : AssessmentAPIService,private toaster: ToastrService,) {
    const userProfile = JSON.parse(sessionStorage.getItem('user'));
   this.userInfo = {
      firstName : userProfile && userProfile.attributes && userProfile.attributes.firstName
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
        let allTextLines = [];
        allTextLines = csv.split(/\r|\n|\r/);
        const arrayLength = allTextLines.length;
        // Reading and createing table rows
        const rows: any[] = [];
        for (let i = 1; i < arrayLength - 1; i++) {
          const rowData = allTextLines[i].split(';')[0].split(',');
          if (rowData.length > 1 && rowData[0]) {
            rows.push({
              questionDes: rowData[0] ? rowData[0].trim() : '',
              duration: rowData[1] ? rowData[1].trim() : '',
              mark:rowData[2] ? rowData[2].trim() : '',
              categoryName:  rowData[3] ? rowData[3].trim() : '',
              createdBy: this.userInfo.firstName ? this.userInfo.firstName : '',
              updatedBy: this.userInfo.firstName ? this.userInfo.firstName : '',
            });
          }
        }
        this.csvRows.push(rows);
      };
    }
    // console.log(this.csvRows)
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
    const excel = `assets/templates/QuestionsUpload.xlsx`;
    window.open(excel, '_blank');
  }


  questionbulkUpload(){
    // const fd = new FormData();
    // fd.append('file', this.selectedCSVFile);
    let data = {
      "quesetionDetails": this.csvRows[0]
    }
    this.http.questionupload(data).subscribe((response: any) => {
      if(response.success == true){
          this.csvFileName = '';
          this.showCsvFileInformation = false;
          this.csvRows = [];
          this.toaster.success(response.message);
      }else{
        this.toaster.error(response.message);
      }
    })
  }
}
