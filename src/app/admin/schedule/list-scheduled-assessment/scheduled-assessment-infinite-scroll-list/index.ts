import { AssesmentsUtil } from './../../../assessments/assessments.common.utils';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduledInfiniteScrollListComponent } from './assessment-infinite-scroll-list.component';
import { YetToStartScheduledAssessmentModule } from './yet-to-start-scheduled-assessment';
import { InProgressScheduledAssessmentModule } from './in-progress-scheduled-assessment';
import { CompletedScheduledAssessmentModule } from './completed-scheduled-assessment';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LazyLoaderModule } from 'src/app/shared/lazy-loader';
import { ScheduleUtils } from '../../schedule.utils';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    YetToStartScheduledAssessmentModule,
    InProgressScheduledAssessmentModule,
    CompletedScheduledAssessmentModule,
    InfiniteScrollModule,
    LazyLoaderModule,
    MaterialModule
  ],
  exports: [ScheduledInfiniteScrollListComponent],
  declarations: [ScheduledInfiniteScrollListComponent],
  providers: [ScheduleUtils, AssesmentsUtil],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ScheduledInfiniteScrollListModule {}
