import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectUserProfileData } from 'src/app/redux/user/user.reducer';
import { UserMetaData } from 'src/app/rest-api/user-api/models/user-profile.model';

@Component({
  selector: 'app-profile-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileHomeComponent implements OnInit {
  profileDetailsForm: FormGroup;
  userDetails: UserMetaData;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private store: Store<AppState>
  ) {
    this.profileDetailsForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    this.store.select(selectUserProfileData).subscribe((val) => {
      this.userDetails = val;
      this.profileDetailsForm.patchValue({
        firstName: this.userDetails.attributes.firstName,
        lastName: this.userDetails.attributes.lastName,
        email: this.userDetails.attributes.email
      });
    });
  }

  onBack(): void {
    this.location.back();
  }
}
