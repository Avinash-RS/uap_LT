import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestInformationComponent } from './test-information.component';

const TestInformationRoutes: Routes = [
  {
    path: '',
    component: TestInformationComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(TestInformationRoutes)],
  exports: [RouterModule]
})
export class TestInformationRoutesRoutingModule {}
