import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackBarMessageModel } from './custom-snack-bar-content.component.model';

@Component({
  selector: 'app-custom-snack-bar',
  templateUrl: 'custom-snack-bar-content.component.html',
  styleUrls: ['custom-snack-bar-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomSnackBarContentComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarMessageModel) {}
}
