import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrEditAssessmentPackageComponent } from './create-or-edit-assessment-package.component';

const CreateAssessmentPackageRoutes: Routes = [
  {
    path: '',
    component: CreateOrEditAssessmentPackageComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(CreateAssessmentPackageRoutes)],
  exports: [RouterModule]
})
export class CreateAssessmentPackageRoutingModule {}
