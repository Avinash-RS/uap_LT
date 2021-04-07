import { NgModule } from '@angular/core';
import { UnAuthorizedMessageComponent } from './unauthorized-message.component';
import { UnAuthorizedMessageRoutingModule } from './unauthorized-message.routing.module';

@NgModule({
  imports: [UnAuthorizedMessageRoutingModule],
  exports: [UnAuthorizedMessageComponent],
  declarations: [UnAuthorizedMessageComponent]
})
export class UnAuthorizedMessageModule {}
