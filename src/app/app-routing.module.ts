import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from 'angular-auth-oidc-client';
import { PrivilegeGuard } from './privilege.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'landing',
        loadChildren: () => import('./assessment/index').then((module) => module.AssessmentModule),
        canActivate: [AutoLoginGuard, PrivilegeGuard]
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/index').then((module) => module.AdminModule),
        canActivate: [AutoLoginGuard, PrivilegeGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/index').then((module) => module.ProfileModule),
        canActivate: [AutoLoginGuard, PrivilegeGuard]
      },
      {
        path: 'unauthorized',
        loadChildren: () =>
          import('../app/shared/unauthorized-message/index').then(
            (module) => module.UnAuthorizedMessageModule
          )
      },
      {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
