import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuestionUploadRoutingModule } from './question-master-routing.module';
import { QuestionMasterComponent } from './question-master/question-master.component';
import { QuestionUploadComponent } from './pages/question-upload/question-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';



@NgModule({
  declarations: [QuestionMasterComponent, QuestionUploadComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    QuestionUploadRoutingModule,
    NgxFileDropModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class QuestionMasterModule { }
