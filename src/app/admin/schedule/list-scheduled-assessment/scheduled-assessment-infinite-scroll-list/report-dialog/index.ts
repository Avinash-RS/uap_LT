import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReportDoalogComponent } from './report-dialog.component';
import { CommonModule } from '@angular/common';
import { NgxPrinterModule } from 'ngx-printer';
import { ScheduleUtils } from '../../../schedule.utils';

@NgModule({
  imports: [CommonModule, NgxPrinterModule.forRoot({printOpenWindow: true})],
  exports: [ReportDoalogComponent],
  declarations: [ReportDoalogComponent],
  providers: [ScheduleUtils],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ReportModule {}
