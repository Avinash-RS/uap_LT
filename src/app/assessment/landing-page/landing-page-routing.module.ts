import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';

const LandingPageRoutes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children : [
 
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(LandingPageRoutes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule {}
