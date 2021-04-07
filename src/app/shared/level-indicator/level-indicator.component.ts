import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-level-indicator',
  templateUrl: 'level-indicator.component.html',
  styleUrls: ['level-indicator.component.scss']
})
export class LevelIndicatorComponent {
  @Input() level: string;
}
