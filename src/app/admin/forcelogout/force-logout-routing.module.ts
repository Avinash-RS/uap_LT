import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutMasterComponent } from './logout-master/logout-master.component';

const routes: Routes = [
  {
    path: '', component: LogoutMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForceLogoutRoutingModule { }
