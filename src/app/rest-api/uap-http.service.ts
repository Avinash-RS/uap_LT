import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class UapHttpService {
  private apiBaseUrl = environment.API_URL;

  constructor(public httpClient: HttpClient, public oidcSecurityService: OidcSecurityService) {}

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
    return `${this.apiBaseUrl}${url}`;
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.oidcSecurityService.getToken()
    });
  }
  private createMultipartDataHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.oidcSecurityService.getToken()
    });
  }
  private createHeadersWithDefaultContentType(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.oidcSecurityService.getToken()
    });
  }

  private createTextPlainContentTypeHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'text/plain',
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.oidcSecurityService.getToken()
    });
  }
  private createOctetStreamHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/text',
      Accept: 'application/octet-stream',
      Authorization: 'Bearer ' + this.oidcSecurityService.getToken()
    });
  }
}
