import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileHomeRoutingModule } from './home-routing.module';
import { ProfileHomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileHomeRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ProfileHomeComponent],
  exports: [ProfileHomeComponent]
})
export class ProfileHomeModule {}
