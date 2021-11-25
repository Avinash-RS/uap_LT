import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ScheduleMasterComponent } from './schedule-master/schedule-master.component';
import { ScheduleUploadComponent } from './pages/schedule-upload/schedule-upload.component';
import { ScheduleUploadRoutingModule } from './bulkschedule-routing.module';



@NgModule({
  declarations: [ScheduleMasterComponent, ScheduleUploadComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ScheduleUploadRoutingModule,
    NgxFileDropModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ScheduleMasterModule { }
