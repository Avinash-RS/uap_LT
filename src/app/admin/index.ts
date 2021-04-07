import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SideNavBarModule } from '../shared/sidenavbar';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, SideNavBarModule],
  exports: [],
  declarations: [AdminComponent],
  providers: []
})
export class AdminModule {}
