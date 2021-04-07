import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduledInfiniteScrollListComponent } from './assessment-infinite-scroll-list.component';
import { YetToStartScheduledAssessmentModule } from './yet-to-start-scheduled-assessment';
import { InProgressScheduledAssessmentModule } from './in-progress-scheduled-assessment';
import { CompletedScheduledAssessmentModule } from './completed-scheduled-assessment';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LazyLoaderModule } from 'src/app/shared/lazy-loader';
import { ScheduleUtils } from '../../schedule.utils';

@NgModule({
  imports: [
    CommonModule,
    YetToStartScheduledAssessmentModule,
    InProgressScheduledAssessmentModule,
    CompletedScheduledAssessmentModule,
    InfiniteScrollModule,
    LazyLoaderModule
  ],
  exports: [ScheduledInfiniteScrollListComponent],
  declarations: [ScheduledInfiniteScrollListComponent],
  providers: [ScheduleUtils]
})
export class ScheduledInfiniteScrollListModule {}
