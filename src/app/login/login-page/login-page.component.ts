import { AppState } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { UserAPIService } from './../../rest-api/user-api/user-api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { assessmentIDAction, loginAttempt, logoutAction } from '../redux/login.actions';
import { ActivatedRoute } from '@angular/router';
import browser from 'browser-detect';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'uap-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  userIP = '';
  loginForm: FormGroup;
  hide = true;
  show = false;
  disableButton: boolean;
  errorMessage: any;
  assessmentId: any;
  browserDetails: any;
  constructor(
    public fb: FormBuilder, 
    public toastr: ToastrService,
    private api: UserAPIService,
    private router: ActivatedRoute,
    private store: Store<AppState>,
    private httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    this.loadIp();
    this.getAssessmentParam();
    this.formInitialize();
    this.getErrorMessage();
    sessionStorage.setItem("smallScreen", 'false')
  }

  getAssessmentParam() {
    this.router.queryParams.subscribe((param: any)=> {
      let params = param;
      sessionStorage.clear();
      if (params && params.assessmentId) {
        this.assessmentId = params.assessmentId;
        sessionStorage.setItem('assessmentId', this.assessmentId);
        this.store.dispatch(assessmentIDAction({id: this.assessmentId}));
      }
    });
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
    sessionStorage.removeItem('token');
    if (this.loginForm.valid) {
      let ipInfo = {
        ip :  this.userIP,
        name: this.browserDetails.name,
        os: this.browserDetails.os,
        version: this.browserDetails.version,
        versionNumber: this.browserDetails.versionNumber
      }

      let apiData = {
        email: this.loginForm.value.username.trim(),
        pass: this.loginForm.value.password.trim(),
        browserinfo: ipInfo,
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

  loadIp() {
    this.httpClient.get('https://jsonip.com').subscribe(
      (value:any) => {
        this.browserDetails = browser();
        this.userIP = value.ip;
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
