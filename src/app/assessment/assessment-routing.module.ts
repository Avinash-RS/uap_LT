import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentComponent } from './assessment.component';

const AssessmentRoutes: Routes = [
  {
    path: '',
    component: AssessmentComponent,
    children: [
      {
        path: 'assessment/:id',
        loadChildren: () =>
          import('./landing-page/index').then((module) => module.LandingPageModule)
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(AssessmentRoutes)],
  exports: [RouterModule]
})
export class AssessmentRoutingModule {}
