import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionUploadComponent } from './pages/question-upload/question-upload.component';


const routes: Routes = [
  {
    path: '', component: QuestionUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionUploadRoutingModule { }
