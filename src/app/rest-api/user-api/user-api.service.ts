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
import { selectUserProfileData } from 'src/app/redux/user/user.reducer';

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

  exitOtherSystem(data: any) {
    return this.httpClient.postNode(`/exitOtherSystem`, data)
  }


  isValidUser(data: any) {
    if (data && data.data && data.token) {
      sessionStorage.setItem('user', JSON.stringify(data.data));
      sessionStorage.setItem('token', data.token.access_token);
      sessionStorage.setItem('refresh_token', data.token.refresh_token);
      sessionStorage.setItem('loginId', data.loginId);
      return true;
    } else {
      this.mulitpleUserLoginToast(data);
      return false;
    }
  }

  mulitpleUserLoginToast(data) {
    if (data && data.exist_login) {
      this.toastr.warning(data && data.message ? data.message : 'You are already logged in...');
    } else {
      if (data.message && data.message.error_description) {
        this.toastr.warning(data && data.message ? data.message.error_description : 'Invalid Login Credentials');
      } else {
        this.toastr.warning(data && data.message ? data.message : 'Invalid Login Credentials');
      }
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
    let permission = this.userredirectTo();
    if (permission && permission == 'AST') {
      let email = sessionStorage.getItem('user') ? (JSON.parse(sessionStorage.getItem('user')) && JSON.parse(sessionStorage.getItem('user')).attributes && JSON.parse(sessionStorage.getItem('user')).attributes.email ? JSON.parse(sessionStorage.getItem('user')).attributes.email : '') : '';
      email ? this.logoutForTestTaker(email) : this.logoutWhenTokenNotPresent();
    } else {
      this.logoutWhenTokenNotPresent();
    }
  }

  logoutForTestTaker(email) {
    this.exitOtherSystem({email}).subscribe((response: any)=> {
      if (response && response.success) {
        this.logoutWhenTokenNotPresent();
      } else {
        // this.toastr.warning(response && response.message ? response.message : 'Try again later');
        this.logoutWhenTokenNotPresent();
      }
    }, (err)=> {

    });
  }

  logoutWhenTokenNotPresent() {
    let getId = sessionStorage.getItem('assessmentId') || sessionStorage.getItem('routeTo');
    sessionStorage.clear();
    if (getId) {
      this.route.navigate(['/login'], { queryParams: {assessmentId: getId}});      
    } else {
      this.route.navigate(['/login']);
    }
    this.store.dispatch(logoutAction());
  }

  
  userredirectTo(): any {
    let permission;
    this.store.select(selectUserProfileData).subscribe((data: any)=> {
      permission = data.attributes.organisations[0].roles[0].roleCode;
    });
    return permission;
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
  }

}
