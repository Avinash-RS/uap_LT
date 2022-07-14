import { Injectable } from '@angular/core';
import { UapHttpService } from '../uap-http.service';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(private httpClient: UapHttpService) { }

  adfSyncCandidates() {
    return this.httpClient.getADF(`/api/HttpTrigger1?code=dB2jpO0PFS1gWYmsPYzoD7qpoem3lEOYmx3thCsjrcBtG7VvsMlfJA==&name=synccandidates`)
  }

  adfSyncMasters() {
    return this.httpClient.getADF(`/api/HttpTrigger1?code=dB2jpO0PFS1gWYmsPYzoD7qpoem3lEOYmx3thCsjrcBtG7VvsMlfJA==&name=syncmasters`)
  }

  adfSyncResults() {
    return this.httpClient.getADF(`/api/HttpTrigger1?code=dB2jpO0PFS1gWYmsPYzoD7qpoem3lEOYmx3thCsjrcBtG7VvsMlfJA==&name=syncresults`)
  }

  // testImport(data) {
  //   return this.httpClient.post(`/testImport`, data)
  // }

  testDetailsImport(data) {
    return this.httpClient.post(`/testDetailsImport`, data)
  }

  wecpToUapTestImport(data) {
    return this.httpClient.post(`/wecpToUapTestImport`, data)
  }

  wecpScheduleTestSync(data){
    return this.httpClient.post(`/wecpScheduleTestSync`, data)
  }

  checkWECPSyncStatus(data){
    return this.httpClient.post(`/checkWECPSyncStatus`, data)
  }

  // groupMasterImport() {
  //   return this.httpClient.get(`/groupmasterImport`);
  // }


  forcelogout(data){
    return this.httpClient.post(`/exitOtherSystem`, data)
  }


  // WECP Sync Apis


  getUapOrganizations(data){
    return this.httpClient.post(`/getWecpSyncList`,data);
  }

  groupmasterImportApi(data){
    return this.httpClient.post(`/groupmasterImport`,data);
  }

  testImport(data){
    return this.httpClient.post(`/testImport`,data);
  }
  testQuestionDetailsImport(data){
    return this.httpClient.post(`/testQuestionDetailsImport`,data);
  }



  // VideoAssesment(data){
  //   return this.httpClient.getVideoAssesment(`/generateProctorToken`,DataTransferItem)
  // }


}
