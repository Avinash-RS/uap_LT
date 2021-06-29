import { AppState } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { UserAPIService } from './../../rest-api/user-api/user-api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { loginAttempt, logoutAction } from '../redux/login.actions';

@Component({
  selector: 'uap-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  loginForm: FormGroup;
  hide = true;
  show = false;
  disableButton: boolean;
  errorMessage: any;
  constructor(
    public fb: FormBuilder, 
    public toastr: ToastrService,
    private api: UserAPIService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.formInitialize();
    this.getErrorMessage();
  }

  getErrorMessage() {
    // this.store.select(getUserProfileFailure).subscribe((data: any)=> {

    // });
  }

  
  formInitialize() {
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  login() {
    if (this.loginForm.valid) {
      let apiData = {
        email: this.loginForm.value.username,
        pass: this.loginForm.value.password
      }
      this.store.dispatch(loginAttempt({payload: apiData}));
    } else {
    }
  }

  
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

}
