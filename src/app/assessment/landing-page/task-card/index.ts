import { CountdownModule } from 'ngx-countdown';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskCardsComponent } from './task-cards.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, CountdownModule],
  declarations: [TaskCardsComponent],
  exports: [TaskCardsComponent]
})
export class TaskCardsModule {}
