import { UserAPIService } from 'src/app/rest-api/user-api/user-api.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AssessmentTasksReducerState } from '../../assessment/landing-page/redux/landing-page.model';
import { selectAssessmentTasksListState } from '../../assessment/landing-page/redux/landing-page.reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})

export class NavBarComponent {
  assessmentData: any;
  dynamicLogo: any;
  userDetails:any
  constructor(private router: Router,
    private store: Store<AssessmentTasksReducerState>, private userService: UserAPIService) {
  }

  ngOnInit(): void {
      this.userDetails = this.userService.getUserFromLocalStorage();
      if(this.userDetails && this.userDetails.attributes && this.userDetails.attributes.organisations && this.userDetails.attributes.organisations[0].logoUrl ){
          this.dynamicLogo = this.userDetails.attributes.organisations[0].logoUrl;
      }else {
        this.dynamicLogo = 'https://assets.lntedutech.com/edutech_logo.svg';
      }

    this.store.select(selectAssessmentTasksListState).subscribe((response) => {
      this.assessmentData = response;
    });
  }

  logout(): void {
    // this.store.dispatch(loginAction.logoutAction());
    this.userService.logout();
    // this.oidcSecurityService.logoff(this.postLogOut);
  }

  navigateToProfile(): void {
    this.router.navigateByUrl('/profile');
  }

  postLogOut(url:string) {
    window.location.assign(`${url}&post_logout_redirect_uri=${window.location.href}`);
  }
}
