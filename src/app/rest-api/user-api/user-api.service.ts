import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UapHttpService } from '../uap-http.service';
import { UserProfileResponseModel } from './models/user-profile.model';
import { CustomSnackBarContentComponent } from 'src/app/shared/custom-snack-bar-content/custom-snack-bar-content.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { logoutAction } from 'src/app/login/redux/login.actions';

@Injectable()
export class UserAPIService {
  NODEBASEURL = environment.NODE_URL;
  constructor(private httpClient: UapHttpService, private http: HttpClient, private snackBar: MatSnackBar,
    private toastr: ToastrService, private route: Router, private store: Store<AppState>
    ) {}
  getUserProfile(): Observable<UserProfileResponseModel> {
    return this.httpClient.get<UserProfileResponseModel>(`/profile`);
  }

  login(data: any) {
    return this.httpClient.post(`/login`, data)
  }

  getTokenFromParamForLogin(data: any) {
    return this.httpClient.post(`/getUserToken`, data)
  }


  isValidUser(data: any) {
    if (data && data.data && data.token) {
      sessionStorage.setItem('user', JSON.stringify(data.data));
      sessionStorage.setItem('token', data.token.access_token);
      sessionStorage.setItem('refresh_token', data.token.refresh_token);
      return true;
    } else {
      this.openSnackBar('Invalid Login');
      return false;
    }
  }

  getUserFromLocalStorage() {
    let users: any = sessionStorage.getItem('user');
    return JSON.parse(users);
  }

  getReferenceFromLocalStorage() {
    let reference: any = sessionStorage.getItem('reference');
    return JSON.parse(reference);
  }

  logout() {
    let getId = sessionStorage.getItem('assessmentId') || sessionStorage.getItem('routeTo');
    sessionStorage.clear();
    if (getId) {
      this.route.navigate(['/login'], { queryParams: {assessmentId: getId}});      
    } else {
      this.route.navigate(['/login']);
    }
    this.store.dispatch(logoutAction());
  }

  openSnackBar(message: string | undefined): void {
    const snackBarRef = this.snackBar.openFromComponent(CustomSnackBarContentComponent, {
      duration: 2000,
      data: {
        displayMessage: '',
        errorMessage: message,
        errorCode: 400
      },
      verticalPosition: 'top',
      panelClass: ['snackbar']
    });
    // Once the snackbar is closed reset snackbarMessage to initial reducer state
    // snackBarRef.afterDismissed().subscribe(() => {
    //   this.store.dispatch(
    //     ScheduleActions.resetCreateScheduleAsessmentPackageSnackBarMessage({
    //       payload: {
    //         snackbarMessage: ScheduleModuleEnum.CreatingScheduleAssessmentStatus
    //       }
    //     })
    //   );
    // });
  }

}
