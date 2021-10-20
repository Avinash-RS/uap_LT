import { MaterialModule } from './../../../material/material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SystemReadinessCheckComponent } from './system-readiness-check.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, MaterialModule],
  declarations: [SystemReadinessCheckComponent],
  exports: [SystemReadinessCheckComponent]
})
export class SystemReadinessCheckModule {}
