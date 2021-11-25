
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/material/material.module';
import { TestInformationRoutesRoutingModule } from './test-information-routing.module';
import { TestInformationComponent } from './test-information.component';

@NgModule({
  imports: [CommonModule, MatDialogModule,MatButtonModule, MatIconModule, MaterialModule,TestInformationRoutesRoutingModule],
  declarations: [TestInformationComponent],
  exports: [TestInformationComponent]
})
export class  TestInformationModule {}
