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
        path: 'sync',
        loadChildren: () => import('./sync/sync.module').then((module) => module.SyncModule),
        // canActivate: [AdminPrivilegeGuard]
      },
      {
        path: 'logout',
        loadChildren: () => import('./forcelogout/force-logout.module').then((module) => module.ForceLogoutModule),
        // canActivate: [AdminPrivilegeGuard]
      },

      {
        path: 'Questions',
        loadChildren: () => import('./questionMasterExcelUpload/question-master.module').then((module) => module.QuestionMasterModule),
        // canActivate: [AdminPrivilegeGuard]
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
