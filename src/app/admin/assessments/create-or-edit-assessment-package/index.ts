import { NgModule } from '@angular/core';
import { CreateAssessmentPackageRoutingModule } from './create-or-edit-assessment-package-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomSnackBarModule } from 'src/app/shared/custom-snack-bar-content';
import { CreateOrEditAssessmentPackageComponent } from './create-or-edit-assessment-package.component';

@NgModule({
  imports: [
    CreateAssessmentPackageRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    CustomSnackBarModule
  ],
  exports: [CreateOrEditAssessmentPackageComponent],
  declarations: [CreateOrEditAssessmentPackageComponent],
  providers: []
})
export class CreateOrEditAssessmentPackageModule {}
