import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AssessmentsRoutingModule } from './assessments-routing.module';
import { AssessmentsComponent } from './assessments.component';
import { AssessmentsEffects } from './redux/assessments.effects';
import * as fromAssessmentsReducer from './redux/assessments.reducers';
@NgModule({
  imports: [
    AssessmentsRoutingModule,
    StoreModule.forFeature('assessmentsModule', {
      assessmentsModuleState: fromAssessmentsReducer.reducer
    }),
    EffectsModule.forFeature([AssessmentsEffects])
  ],
  exports: [AssessmentsComponent],
  declarations: [AssessmentsComponent]
})
export class AssessmentsModule {}
