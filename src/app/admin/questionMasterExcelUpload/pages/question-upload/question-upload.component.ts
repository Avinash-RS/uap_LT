import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
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

  constructor(private http : AssessmentAPIService) { }

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
              quesCode: rowData[0] ? rowData[0].trim() : '',
              quesType: rowData[1] ? rowData[1].trim() : '',
              questionDes: rowData[2] ? rowData[2].trim() : '',
              createdBy: rowData[3] ? rowData[3].trim() : '',
              updatedBy: rowData[4] ? rowData[4].trim() : '',
              duration: rowData[5] ? rowData[5].trim() : '',
              mark:rowData[6] ? rowData[6].trim() : '',
              categoryId: rowData[7] ? rowData[7].trim() : '',
              categoryName:  rowData[8] ? rowData[8].trim() : '',
            });
          }
        }
        this.csvRows.push(rows);
        console.log(this.csvRows)
        // Check for valid emails, update if valid,invalid email exists
        rows.forEach((qusInfo: any) => {
            console.log(qusInfo)
            const isEmpty = Object.values(qusInfo).every(x => (x === null || x === ""));
            console.log(isEmpty,'asdasd')
          // this.validateEmailAndUpdateValidInvalidEmailList(candidateInfo);
          // this.disableCreateButton = this.validEmailsList.length ? false : true;
        });
        // this.findAndUpdateDuplicateEmailsList(rows);
      };
    }
    console.log(this.csvRows)
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


  questionbulkUpload(){
    const fd = new FormData();
    fd.append('file', this.selectedCSVFile);
    this.http.questionupload(fd).subscribe((response: any) => {
        console.log(response)
    })
  }
}