import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavBarModule } from '../shared/navbar';
import { AssessmentRoutingModule } from './assessment-routing.module';
import { AssessmentComponent } from './assessment.component';

@NgModule({
  imports: [CommonModule, AssessmentRoutingModule, NavBarModule],
  declarations: [AssessmentComponent]
})
export class AssessmentModule {}
