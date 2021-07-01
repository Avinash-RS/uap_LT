import { UserAPIService } from 'src/app/rest-api/user-api/user-api.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Store } from '@ngrx/store';
import { AssessmentTasksReducerState } from '../../assessment/landing-page/redux/landing-page.model';
import { selectAssessmentTasksListState } from '../../assessment/landing-page/redux/landing-page.reducers';
import  * as loginAction from 'src/app/login/redux/login.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})

export class NavBarComponent {
  assessmentData: any;
  displayName = '';
  constructor(private router: Router,
    private store: Store<AssessmentTasksReducerState>, private userService: UserAPIService) {
  }

  ngOnInit(): void {
    this.store.select(selectAssessmentTasksListState).subscribe((response) => {
      this.assessmentData = response;
      if (this.assessmentData) {
        this.displayName = this.assessmentData.data.attributes.firstName + ' ' + this.assessmentData.data.attributes.lastName;
      }
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
