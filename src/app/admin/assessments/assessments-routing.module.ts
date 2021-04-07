import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from 'angular-auth-oidc-client';
import { AssessmentsComponent } from './assessments.component';

const AssessmentsRoutes: Routes = [
  {
    path: '',
    component: AssessmentsComponent,
    children: [
      {
        path: 'list',
        loadChildren: () =>
          import('./list-assessment-package/index').then(
            (module) => module.ListAssessmentPackageModule
          ),
        canActivate: [AutoLoginGuard]
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./create-or-edit-assessment-package/index').then(
            (module) => module.CreateOrEditAssessmentPackageModule
          ),
        canActivate: [AutoLoginGuard]
      },
      {
        path: 'view/:id',
        loadChildren: () =>
          import('./view-assessment-package/index').then(
            (module) => module.ViewAssessmentPackageModule
          ),
        canActivate: [AutoLoginGuard]
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
  imports: [RouterModule.forChild(AssessmentsRoutes)],
  exports: [RouterModule]
})
export class AssessmentsRoutingModule {}
