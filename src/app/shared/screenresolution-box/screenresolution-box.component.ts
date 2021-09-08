import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-screenresolution-box',
  templateUrl: './screenresolution-box.component.html',
  styleUrls: ['./screenresolution-box.component.scss']
})
export class ScreenresolutionBoxComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ScreenresolutionBoxComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) { }

  ngOnInit() {
    if (!this.data) {
      this.cancel();
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }

  logout() {
        window.close();
  }

}
