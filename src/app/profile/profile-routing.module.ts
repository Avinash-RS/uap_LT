import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

const ProfileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/index').then((module) => module.ProfileHomeModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(ProfileRoutes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
