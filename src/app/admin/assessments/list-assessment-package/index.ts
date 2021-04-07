import { NgModule } from '@angular/core';
import { ListAssessmentPackageComponent } from './list-assessment-package.component';
import { ListAssessmentPackageRoutingModule } from './list-assessment-package-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { AssessmentPackageCardModule } from './assessment-package-card';
import { CommonModule } from '@angular/common';
import { InfiniteScrollListModule } from './infinite-scroll-list';
import { SearchModule } from 'src/app/shared/search';

@NgModule({
  imports: [
    CommonModule,
    ListAssessmentPackageRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    AssessmentPackageCardModule,
    InfiniteScrollListModule,
    SearchModule
  ],
  exports: [ListAssessmentPackageComponent],
  declarations: [ListAssessmentPackageComponent]
})
export class ListAssessmentPackageModule {}
