import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivilegeAutoLogoutGuard } from './privilege-auto-logout.guard';
import { PrivilegeGuard } from './privilege.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then((module) => module.LoginModule),
        canActivate: [PrivilegeAutoLogoutGuard]
      },
      {
        path: 'landing',
        loadChildren: () => import('./assessment/index').then((module) => module.AssessmentModule),
        canActivate: [PrivilegeGuard]
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/index').then((module) => module.AdminModule),
        canActivate: [PrivilegeGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/index').then((module) => module.ProfileModule),
        canActivate: [PrivilegeGuard]
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
        redirectTo: 'login',
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
