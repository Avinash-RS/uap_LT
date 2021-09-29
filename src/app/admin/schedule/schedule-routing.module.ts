import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AutoLoginGuard } from 'angular-auth-oidc-client';
import { StatusComponent } from './schedule.component';

const StatusRoutes: Routes = [
  {
    path: '',
    component: StatusComponent,
    children: [
      {
        path: 'create',
        loadChildren: () =>
          import('./create-schedule-package/index').then(
            (module) => module.CreateScheduleAssessmentPackageModule
          ),
        // canActivate: [AutoLoginGuard]
      },
      {
        path: 'list',
        loadChildren: () =>
          import('./list-scheduled-assessment/index').then(
            (module) => module.ListScheduledAssessmentModule
          ),
        // canActivate: [AutoLoginGuard]
      },

      {
        path: 'edit',
        loadChildren: () =>
          import('./edit-schedule-package/index').then(
            (module) => module.EditScheduleAssessmentPackageModule
          ),
        // canActivate: [AutoLoginGuard]
      },
      
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(StatusRoutes)],
  exports: [RouterModule]
})
export class StatusRoutingModule {}
