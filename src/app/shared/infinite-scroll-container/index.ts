import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniteScrollContainerComponent } from './infinite-scroll-container.component';
import { LazyLoaderModule } from '../lazy-loader';

@NgModule({
  imports: [CommonModule, InfiniteScrollModule, LazyLoaderModule],
  exports: [InfiniteScrollContainerComponent],
  declarations: [InfiniteScrollContainerComponent]
})
export class InfiniteScrollContainerModule {}
