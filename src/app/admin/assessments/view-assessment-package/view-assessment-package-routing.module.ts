import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAssessmentPackageComponent } from './view-assessment-package.component';

const ViewAssessmentPackageRoutes: Routes = [
  {
    path: '',
    component: ViewAssessmentPackageComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(ViewAssessmentPackageRoutes)],
  exports: [RouterModule]
})
export class ViewAssessmentPackageRoutingModule {}
