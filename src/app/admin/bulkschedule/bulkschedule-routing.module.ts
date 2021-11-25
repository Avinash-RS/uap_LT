import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleUploadComponent } from './pages/schedule-upload/schedule-upload.component';


const routes: Routes = [
  {
    path: '', 
    component: ScheduleUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleUploadRoutingModule { }
