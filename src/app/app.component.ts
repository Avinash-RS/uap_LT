import { assessmentIDAction } from './login/redux/login.actions';
import { autoLogin } from './redux/user/user.actions';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UserAPIService } from 'src/app/rest-api/user-api/user-api.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';

// TODO: configure sass in main.scss
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['main.scss', './app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'uap';

  constructor(private userService: UserAPIService, private route: Router, private store: Store<AppState>) {
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.store.dispatch(autoLogin());
      if (localStorage.getItem('assessmentId')) {
        this.store.dispatch(assessmentIDAction({id: localStorage.getItem('assessmentId')}));
      }
    }
  }
}
