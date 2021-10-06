import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForceLogoutComponent } from './pages/force-logout/force-logout.component';
import { LogoutMasterComponent } from './logout-master/logout-master.component';
import { ForceLogoutRoutingModule } from './force-logout-routing.module';


@NgModule({
  declarations: [LogoutMasterComponent, ForceLogoutComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ForceLogoutRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ForceLogoutModule { }
