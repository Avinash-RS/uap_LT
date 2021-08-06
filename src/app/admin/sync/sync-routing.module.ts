import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SyncMasterComponent } from './sync-master/sync-master.component';

const routes: Routes = [
  {
    path: '', component: SyncMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SyncRoutingModule { }
