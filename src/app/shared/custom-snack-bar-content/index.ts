import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomSnackBarContentComponent } from './custom-snack-bar-content.component';

@NgModule({
  imports: [CommonModule],
  exports: [CustomSnackBarContentComponent],
  declarations: [CustomSnackBarContentComponent]
})
export class CustomSnackBarModule {}
