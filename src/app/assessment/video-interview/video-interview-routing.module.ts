import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoInterviewComponent } from './video-interview.component';

const VideoInterviewRoutes: Routes = [
  {
    path: '',
    component: VideoInterviewComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(VideoInterviewRoutes)],
  exports: [RouterModule]
})
export class VideoInterviewRoutingModule {}
