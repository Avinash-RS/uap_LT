import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditSchedulePackageComponent } from './edit-schedule-package.component';

const EditSchedulePackageRoutes: Routes = [
  {
    path: '',
    component: EditSchedulePackageComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(EditSchedulePackageRoutes)],
  exports: [RouterModule]
})
export class EditSchedulePackageRoutingModule {}
