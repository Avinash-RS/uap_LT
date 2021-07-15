import { getReferenceDataSuccess } from './redux/reference-data/reference-data.actions';
import { LoadingService } from './rest-api/loading.service';
import { assessmentIDAction } from './login/redux/login.actions';
import { autoLogin } from './redux/user/user.actions';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UserAPIService } from 'src/app/rest-api/user-api/user-api.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';

// TODO: configure sass in main.scss
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['main.scss', './app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'uap';
  loading: boolean = true;

  constructor(private _loading: LoadingService, private userService: UserAPIService, private route: Router, private store: Store<AppState>) {
  }

  ngOnInit() {
    if (sessionStorage.getItem('token')) {
      this.store.dispatch(autoLogin());
      const reference = this.userService.getReferenceFromLocalStorage();
      reference ? this.store.dispatch(getReferenceDataSuccess({payload: reference})) : '';
      if (sessionStorage.getItem('assessmentId')) {
        this.store.dispatch(assessmentIDAction({id: sessionStorage.getItem('assessmentId')}));
      }
    }

    this.listenToLoading();
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading: any) => {
        this.loading = loading;
      });
  }

}
