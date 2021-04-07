import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSchedulePackageComponent } from './create-schedule-package.component';

const CreateSchedulePackageRoutes: Routes = [
  {
    path: '',
    component: CreateSchedulePackageComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(CreateSchedulePackageRoutes)],
  exports: [RouterModule]
})
export class CreateSchedulePackageRoutingModule {}
