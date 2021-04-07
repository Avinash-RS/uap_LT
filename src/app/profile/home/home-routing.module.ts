import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileHomeComponent } from './home.component';

const ProfileHomeRoutes: Routes = [
  {
    path: '',
    component: ProfileHomeComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(ProfileHomeRoutes)],
  exports: [RouterModule]
})
export class ProfileHomeRoutingModule {}
