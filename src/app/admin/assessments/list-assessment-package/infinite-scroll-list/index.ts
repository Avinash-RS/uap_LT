import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniteScrollListComponent } from './infinite-scroll-list.component';
import { InfiniteScrollContainerModule } from 'src/app/shared/infinite-scroll-container';
import { AssessmentPackageCardModule } from '../assessment-package-card';

@NgModule({
  imports: [CommonModule, InfiniteScrollContainerModule, AssessmentPackageCardModule],
  exports: [InfiniteScrollListComponent],
  declarations: [InfiniteScrollListComponent]
})
export class InfiniteScrollListModule {}
