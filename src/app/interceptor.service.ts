import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoadingService } from './rest-api/loading.service';
import { Router } from '@angular/router';
@Injectable()
export class InterceptorService implements HttpInterceptor {


  constructor(
    private _loading: LoadingService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const clone = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });
    if (!request.url.includes('/packages') && !request.url.includes('/schedules?') && !request.url.includes('/assessments?batchId=') && !request.url.includes('/groupmasterImport') && !request.url.includes('/testImport') && !request.url.includes('/testDetailsImport') && !request.url.includes('/getWecpSyncList') ) {
      this._loading.setLoading(true, request.url);
    }
    return next.handle(clone).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
                this._loading.setLoading(false, request.url);
        }
        return event;
      }),
      retry(1),
      catchError((error: HttpErrorResponse) => {
        this._loading.setLoading(false, request.url);
          if (error && error['status'] !== 200) {
          // console.log(error ? error : '');
        }

        if (error.status === 0) {
          return throwError(error);
        }
        
        if (error.status === 400) {
          return throwError(error);
        }

        if (error.status === 401) {
          this.router.navigate(['/unauthorized']);
          return throwError(error);
        }

        if (error.status === 403) {
            return throwError(error);
        }

        if (error.status === 422) {
          return throwError(error);
        }

        if (error.status === 500) {
          return throwError(error);
        }

        if (error.status === 404) {
          return throwError(error);
        }

        if (error.status === 409) {
          return throwError(error);
        }

        if (error.status === 200) {
        } else {
          return throwError(error);
        }
        return throwError(error);
      })
    );
  }
}
