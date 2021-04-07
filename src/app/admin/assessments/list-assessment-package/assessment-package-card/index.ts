import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { AssessmentPackageCardComponent } from './assessment-package-card.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LevelIndicatorModule } from 'src/app/shared/level-indicator';
import { AssesmentsUtil } from '../../assessments.common.utils';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    LevelIndicatorModule
  ],
  exports: [AssessmentPackageCardComponent],
  declarations: [AssessmentPackageCardComponent],
  providers: [AssesmentsUtil]
})
export class AssessmentPackageCardModule {}
