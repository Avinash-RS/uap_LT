import { MaterialModule } from './../../material/material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskCardsComponent } from './task-card/task-cards.component';
import { LandingPageUtils } from './landing-page.common.utils';
import { StoreModule } from '@ngrx/store';
import * as fromAssessmentTasksReducer from './redux/landing-page.reducers';
import { EffectsModule } from '@ngrx/effects';
import { LandingPageEffects } from './redux/landing-page.effects';
import { CountdownModule } from 'ngx-countdown';
import { TermsAndConditionModule } from 'src/app/shared/terms-and-condition';


@NgModule({
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature('assessmentTasksModule', {
      assessmentTasksModuleState: fromAssessmentTasksReducer.LandingPageReducer
    }),
    EffectsModule.forFeature([LandingPageEffects]),
    CountdownModule,
    TermsAndConditionModule
  ],
  declarations: [LandingPageComponent,TaskCardsComponent],
  providers: [LandingPageUtils]
})
export class LandingPageModule {}
