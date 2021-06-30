import { LoadingService } from './../rest-api/loading.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.scss']
})
export class AdminComponent {
  constructor(private _loading: LoadingService) {
    this._loading.setLoading(false, 'request.url');
  }
}
