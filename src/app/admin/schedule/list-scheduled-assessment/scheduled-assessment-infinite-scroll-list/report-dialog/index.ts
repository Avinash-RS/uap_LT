import { NgModule } from '@angular/core';
import { ReportDoalogComponent } from './report-dialog.component';
import { CommonModule } from '@angular/common';
import { NgxPrinterModule } from 'ngx-printer';
import { ScheduleUtils } from '../../../schedule.utils';

@NgModule({
  imports: [CommonModule, NgxPrinterModule],
  exports: [ReportDoalogComponent],
  declarations: [ReportDoalogComponent],
  providers: [ScheduleUtils]
})
export class ReportModule {}
