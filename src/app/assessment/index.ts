import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { NavBarModule } from '../shared/navbar';
import { AssessmentRoutingModule } from './assessment-routing.module';
import { AssessmentComponent } from './assessment.component';
@NgModule({
  imports: [CommonModule, AssessmentRoutingModule, NavBarModule,MaterialModule],
  declarations: [AssessmentComponent]
})
export class AssessmentModule {}
