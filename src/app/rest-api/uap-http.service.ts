import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class UapHttpService {
  private apiBaseUrl = environment.API_URL;
  private apiNodeUrl = environment.NODE_URL;

  constructor(public httpClient: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(this.getUrl(url), { headers: this.createHeaders() });
  }

  getWithOctetStreamHeaders(url: string): Observable<Blob> {
    return this.httpClient
      .get(this.getUrl(url), { headers: this.createOctetStreamHeaders(), responseType: 'text' })
      .pipe(map((response) => new Blob([response], { type: 'application/octet-stream' })));
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.httpClient.post<T>(this.getUrl(url), data, { headers: this.createHeaders() });
  }
  postWithMultipartDataHeaders<T>(url: string, data: any): Observable<T> {
    return this.httpClient.post<T>(this.getUrl(url), data, {
      headers: this.createMultipartDataHeaders()
    });
  }
  postwithDefaultContentTypeHeader<T>(url: string, data: any): Observable<T> {
    return this.httpClient.post<T>(this.getUrl(url), data, {
      headers: this.createHeadersWithDefaultContentType()
    });
  }
  postWithTextPlainContent<T>(url: string, data: any): Observable<T> {
    return this.httpClient.post<T>(this.getUrl(url), data, {
      headers: this.createTextPlainContentTypeHeaders()
    });
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.httpClient.put<T>(this.getUrl(url), data, { headers: this.createHeaders() });
  }

  patch<T>(url: string, data: any): Observable<T> {
    return this.httpClient.patch<T>(this.getUrl(url), data, { headers: this.createHeaders() });
  }

  delete(url: string): Observable<{}> {
    return this.httpClient.delete<{}>(this.getUrl(url), { headers: this.createHeaders() });
  }
  private getUrl(url: string): string {
    // if (url.includes('/bulkSchedules')) {
    //   return `http://localhost:4000${url}`;
    // }
    if (!url.includes('/login') &&
     !url.includes('/getUserToken') && 
     !url.includes('/schedules') && 
     !url.includes('/bulkSchedules') && 
     !url.includes('/start') && 
     !url.includes('/packages///') && 
     !url.includes('/taskStatusUpdate') &&
     !url.includes('/testImport') &&
     !url.includes('/testDetailsImport') &&
     !url.includes('/wecpToUapTestImport')
     ) {
    return `${this.apiBaseUrl}${url}`;
    } else {
      return `${this.apiNodeUrl}${url}`;
    }
  }

  private getToken() {
    return sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ''
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.getToken()
    });
  }
  private createMultipartDataHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken()
    });
  }
  private createHeadersWithDefaultContentType(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.getToken()
    });
  }

  private createTextPlainContentTypeHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'text/plain',
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.getToken()
    });
  }
  private createOctetStreamHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/text',
      Accept: 'application/octet-stream',
      Authorization: 'Bearer ' + this.getToken()
    });
  }
}
