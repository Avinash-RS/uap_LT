import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemReadinessCheckComponent } from './system-readiness-check.component';

const SystemReadinessCheckRoutes: Routes = [
  {
    path: '',
    component: SystemReadinessCheckComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(SystemReadinessCheckRoutes)],
  exports: [RouterModule]
})
export class SystemReadinessCheckRoutesRoutingModule {}
