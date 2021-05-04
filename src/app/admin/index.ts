import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SideNavBarModule } from '../shared/sidenavbar';
import { AdminPrivilegeGuard } from './admin-privilage.gurd';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, SideNavBarModule],
  exports: [],
  declarations: [AdminComponent],
  providers: [AdminPrivilegeGuard]
})
export class AdminModule {}
