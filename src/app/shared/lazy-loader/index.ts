import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoaderComponent } from './lazy-loader.component';

@NgModule({
  imports: [CommonModule],
  exports: [LazyLoaderComponent],
  declarations: [LazyLoaderComponent]
})
export class LazyLoaderModule {}
