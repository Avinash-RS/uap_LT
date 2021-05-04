import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPrivilegeGuard } from './admin-privilage.gurd';
import { AdminComponent } from './admin.component';

const AdminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/index').then((module) => module.HomeModule),
        canActivate:[AdminPrivilegeGuard]
      },
      {
        path: 'assessments',
        loadChildren: () => import('./assessments/index').then((module) => module.AssessmentsModule),
        canActivate:[AdminPrivilegeGuard]
      },
      {
        path: 'schedule',
        loadChildren: () => import('./schedule/index').then((module) => module.StatusModule),
        canActivate:[AdminPrivilegeGuard]
      },
      {
        path: '',
        // TODO: redirect it to home once home screen is available
        //redirectTo: 'assessments',
        pathMatch: 'full',
        canActivate:[AdminPrivilegeGuard]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(AdminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
