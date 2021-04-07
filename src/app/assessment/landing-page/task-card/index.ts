import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskCardsComponent } from './task-cards.component';

@NgModule({
  imports: [MatButtonModule, MatIconModule],
  declarations: [TaskCardsComponent],
  exports: [TaskCardsComponent]
})
export class TaskCardsModule {}
