import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UapHttpService } from '../uap-http.service';
import { UserProfileResponseModel } from './models/user-profile.model';

@Injectable()
export class UserAPIService {
  constructor(private httpClient: UapHttpService) {}
  getUserProfile(): Observable<UserProfileResponseModel> {
    return this.httpClient.get<UserProfileResponseModel>(`/profile`);
  }
}
