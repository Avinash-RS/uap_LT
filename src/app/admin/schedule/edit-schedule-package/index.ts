import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { AdminUtils } from '../../admin.utils';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditSchedulePackageComponent } from './edit-schedule-package.component';
import { EditSchedulePackageRoutingModule } from './edit-schedule-package-routing.module';
@NgModule({
  imports: [
    EditSchedulePackageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    NgxMaterialTimepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    NgxFileDropModule,
    MatSnackBarModule
  ],
  exports: [EditSchedulePackageComponent],
  declarations: [EditSchedulePackageComponent],
  providers: [AdminUtils]
})
export class EditScheduleAssessmentPackageModule {}
