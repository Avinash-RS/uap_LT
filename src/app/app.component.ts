import { getReferenceDataSuccess } from './redux/reference-data/reference-data.actions';
import { LoadingService } from './rest-api/loading.service';
import { assessmentIDAction } from './login/redux/login.actions';
import { autoLogin } from './redux/user/user.actions';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UserAPIService } from 'src/app/rest-api/user-api/user-api.service';
import { Component, ViewEncapsulation, OnInit, HostListener } from '@angular/core';
import { delay, switchMap } from 'rxjs/operators';
import { ScreenresolutionBoxComponent } from './shared/screenresolution-box/screenresolution-box.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

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
  isPopUpOpened = false;
  isIE = false;
  userIP = '';

  constructor(private _loading: LoadingService, private userService: UserAPIService, private matDialog: MatDialog, private route: Router, private store: Store<AppState>) {
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
    this.checkIE();
  }


   

  public getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
}
  // @HostListener('window:mousemove', ['$event'])
  checkIE(event?) {
    // please note, 
// that IE11 now returns undefined again for window.chrome
// and new Opera 30 outputs true for window.chrome
// but needs to check if window.opr is not undefined
// and new IE Edge outputs to true now for window.chrome
// and if not iOS Chrome check
// so use the below updated condition
var isChromium = window['chrome'];
var winNav = window.navigator;
var vendorName = winNav.vendor;
var isMobile = winNav && winNav['userAgentData'] && winNav['userAgentData']['mobile'] ? winNav['userAgentData']['mobile'] : false;
var isOpera = typeof window['opr'] !== "undefined";
var isIEedge = window.navigator.userAgent.indexOf("Edg/") > -1;
var isIOSChrome = winNav.userAgent.match("CriOS");
if (isIOSChrome) {
   // is Google Chrome on IOS
} else if(
  isChromium !== null &&
  typeof isChromium !== "undefined" &&
  vendorName === "Google Inc." &&
  isOpera === false &&
  isIEedge === false &&
  !isMobile
) {
   // is Google Chrome
} else { 
  this.isIE = true;
  const data = {
    data: true,
    type: 'browser'
  };
  if (!this.isPopUpOpened) {
    this._loading.setLoading(false, 'sad');
    this.openDialog(ScreenresolutionBoxComponent, data);
  }
   // not Google Chrome 
 }
}


  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading: any) => {
        this.loading = loading;
      });
  }


  openDialog(component, data) {
    let dialogDetails: any;


    /**
     * Dialog modal window
     */
    // tslint:disable-next-line: one-variable-per-declaration
    this.isPopUpOpened = true;
    const dialogRef = this.matDialog.open(component, {
      width: 'auto',
      height: 'auto',
      autoFocus: false,
      disableClose: true,
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isPopUpOpened = false;
      if (result) {
      }
    });
  }

}
