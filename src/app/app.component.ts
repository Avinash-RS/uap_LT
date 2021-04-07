import { Component, ViewEncapsulation } from '@angular/core';

// TODO: configure sass in main.scss
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['main.scss', './app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'uap';
}
