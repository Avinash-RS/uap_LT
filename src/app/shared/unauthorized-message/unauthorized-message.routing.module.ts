import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnAuthorizedMessageComponent } from './unauthorized-message.component';

const UnAuthorizedMessageRoutes: Routes = [
  {
    path: '',
    component: UnAuthorizedMessageComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(UnAuthorizedMessageRoutes)],
  exports: [RouterModule]
})
export class UnAuthorizedMessageRoutingModule {}
