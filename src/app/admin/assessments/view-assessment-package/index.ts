import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewAssessmentPackageRoutingModule } from './view-assessment-package-routing.module';
import { ViewAssessmentPackageComponent } from './view-assessment-package.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AssesmentsUtil } from '../assessments.common.utils';
import { CreateOrEditAssessmentPackageModule } from '../create-or-edit-assessment-package';
import { SnackbarModule } from 'src/app/shared/snack-bar';
@NgModule({
  imports: [
    ViewAssessmentPackageRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCheckboxModule,
    SnackbarModule,
    CreateOrEditAssessmentPackageModule
  ],
  exports: [ViewAssessmentPackageComponent],
  declarations: [ViewAssessmentPackageComponent],
  providers: [AssesmentsUtil]
})
export class ViewAssessmentPackageModule {}
