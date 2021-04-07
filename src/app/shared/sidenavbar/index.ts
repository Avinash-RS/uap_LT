import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideNavBarComponent } from './sidenavbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavBarModule } from '../navbar';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, RouterModule, MatSidenavModule, NavBarModule],
  exports: [SideNavBarComponent],
  declarations: [SideNavBarComponent],
  providers: []
})
export class SideNavBarModule {}
