import { MaterialModule } from './../material/material.module';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarModule } from '../shared/navbar';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, FormsModule, ReactiveFormsModule, NavBarModule, SharedModule, MaterialModule],
  exports: [ProfileComponent]
})
export class ProfileModule {}
