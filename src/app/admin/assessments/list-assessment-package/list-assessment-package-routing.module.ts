import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAssessmentPackageComponent } from './list-assessment-package.component';

const ListAssessmentPackageRoutes: Routes = [
  {
    path: '',
    component: ListAssessmentPackageComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(ListAssessmentPackageRoutes)],
  exports: [RouterModule]
})
export class ListAssessmentPackageRoutingModule {}
