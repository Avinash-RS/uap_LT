
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SystemReadinessCheckComponent } from './system-readiness-check.component';
import { SystemReadinessCheckRoutesRoutingModule } from './system-readiness-check-routing.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, MaterialModule,SystemReadinessCheckRoutesRoutingModule],
  declarations: [SystemReadinessCheckComponent],
  exports: [SystemReadinessCheckComponent]
})
export class SystemReadinessCheckModule {}
