import { NgModule } from '@angular/core';
import { StatusRoutingModule } from './schedule-routing.module';
import { StatusComponent } from './schedule.component';
import * as fromScheduleReducer from './redux/schedule.reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ScheduleEffects } from './redux/schedule.effects';

@NgModule({
  imports: [
    StatusRoutingModule,
    StoreModule.forFeature('scheduleAssessmentModule', {
      scheduleAssessmentModuleState: fromScheduleReducer.reducer
    }),
    EffectsModule.forFeature([ScheduleEffects])
  ],
  exports: [StatusComponent],
  declarations: [StatusComponent]
})
export class StatusModule {}
