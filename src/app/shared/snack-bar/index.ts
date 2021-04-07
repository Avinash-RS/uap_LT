import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomSnackBarModule } from '../custom-snack-bar-content';
import { SnackbarComponent } from './snack-bar.component';

@NgModule({
  imports: [MatSnackBarModule, CustomSnackBarModule],
  exports: [SnackbarComponent],
  declarations: [SnackbarComponent]
})
export class SnackbarModule {}
