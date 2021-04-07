import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UapHttpService } from '../uap-http.service';
import { ReferenceResponseModel } from './models/reference-api.model';

@Injectable()
export class ReferenceAPIService {
  constructor(private httpClient: UapHttpService) {}
  getReferenceData(): Observable<ReferenceResponseModel> {
    return this.httpClient.get<ReferenceResponseModel>(`/reference`);
  }
}
