import { EventEmitter, OnInit, Output } from '@angular/core';
import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { ErrorResponse } from 'src/app/rest-api/common/models/error.model';
import { CustomSnackBarContentComponent } from '../custom-snack-bar-content/custom-snack-bar-content.component';

@Component({
  selector: 'app-snack-bar',
  templateUrl: 'snack-bar.component.html'
})
export class SnackbarComponent implements OnInit {
  @Input() snackBarSuccessMessage: string;
  @Input() duration: number;
  @Input() snackBarFailureMessage: ErrorResponse;
  @Output() clearReinviteState = new EventEmitter();
  constructor(private snackBar: MatSnackBar, private store: Store) {}

  ngOnInit(): void {
    this.openSnackBar(this.snackBarSuccessMessage, this.duration, this.snackBarFailureMessage);
  }

  openSnackBar(
    message: string = '',
    duration: number,
    snackBarFailureMessage: ErrorResponse
  ): void {
    const snackBarRef = this.snackBar.openFromComponent(CustomSnackBarContentComponent, {
      duration,
      data: {
        displayMessage: message,
        errorCode:
          snackBarFailureMessage !== undefined ? snackBarFailureMessage.error.errors[0].code : '',
        errorMessage:
          snackBarFailureMessage !== undefined ? snackBarFailureMessage.error.errors[0].message : ''
      },
      verticalPosition: 'top',
      panelClass: ['snackbar']
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.clearReinviteState.emit();
    });
  }
}
