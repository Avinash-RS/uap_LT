import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListScheduledAssessmentComponent } from './list-scheduled-assessment.component';

const StatusRoutes: Routes = [
  {
    path: '',
    component: ListScheduledAssessmentComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(StatusRoutes)],
  exports: [RouterModule]
})
export class ListScheduledAssessmentRoutingModule {}
