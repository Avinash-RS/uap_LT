import { Injectable } from '@angular/core';
import { UapHttpService } from '../uap-http.service';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(private httpClient: UapHttpService) { }

  testImport(data) {
    return this.httpClient.post(`/testImport`, data)
  }

  testDetailsImport(data) {
    return this.httpClient.post(`/testDetailsImport`, data)
  }

  wecpToUapTestImport(data) {
    return this.httpClient.post(`/wecpToUapTestImport`, data)
  }

}
