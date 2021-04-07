import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InProgressScheduledAssessmentComponent } from './in-progress-scheduled-assessment.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchModule } from 'src/app/shared/search';
import { ReportModule } from '../report-dialog';
import { SnackbarModule } from 'src/app/shared/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    MatSelectModule,
    MatMenuModule,
    MatFormFieldModule,
    MatMenuModule,
    SearchModule,
    ReportModule,
    SnackbarModule,
    NgxSpinnerModule
  ],
  exports: [InProgressScheduledAssessmentComponent],
  declarations: [InProgressScheduledAssessmentComponent]
})
export class InProgressScheduledAssessmentModule {}
