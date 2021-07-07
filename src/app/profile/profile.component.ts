import { LoadingService } from './../rest-api/loading.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(
    private _loading: LoadingService 
  ) {
    this._loading.setLoading(false, 'request.url');
  }

  ngOnInit() {
    this._loading.setLoading(false, 'request.url');
  }
}
