import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListScheduledAssessmentComponent } from './list-scheduled-assessment.component';
import { ListScheduledAssessmentRoutingModule } from './list-scheduled-assessment-routing.module';
import { SearchModule } from 'src/app/shared/search';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { ScheduledInfiniteScrollListModule } from './scheduled-assessment-infinite-scroll-list';

@NgModule({
  imports: [
    CommonModule,
    ListScheduledAssessmentRoutingModule,
    SearchModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    ScheduledInfiniteScrollListModule
  ],
  exports: [ListScheduledAssessmentComponent],
  declarations: [ListScheduledAssessmentComponent]
})
export class ListScheduledAssessmentModule {}
