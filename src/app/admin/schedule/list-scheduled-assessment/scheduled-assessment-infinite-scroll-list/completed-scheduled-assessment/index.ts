import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletedScheduledAssessmentComponent } from './completed-scheduled-assessment.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchModule } from 'src/app/shared/search';
import { ReportModule } from '../report-dialog';
@NgModule({
  imports: [CommonModule, InfiniteScrollModule, MatFormFieldModule, SearchModule, ReportModule],
  exports: [CompletedScheduledAssessmentComponent],
  declarations: [CompletedScheduledAssessmentComponent]
})
export class CompletedScheduledAssessmentModule {}
