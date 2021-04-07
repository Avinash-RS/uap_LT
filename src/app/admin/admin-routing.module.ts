import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const AdminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/index').then((module) => module.HomeModule)
      },
      {
        path: 'assessments',
        loadChildren: () => import('./assessments/index').then((module) => module.AssessmentsModule)
      },
      {
        path: 'schedule',
        loadChildren: () => import('./schedule/index').then((module) => module.StatusModule)
      },
      {
        path: '',
        // TODO: redirect it to home once home screen is available
        redirectTo: 'assessments',
        pathMatch: 'full'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(AdminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
