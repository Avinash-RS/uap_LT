import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as referenceDataActions from './reference-data.actions';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ErrorResponse } from 'src/app/rest-api/common/models/error.model';
import { ReferenceAPIService } from 'src/app/rest-api/reference-api/reference-api.service';
import { ReferenceResponseModel } from 'src/app/rest-api/reference-api/models/reference-api.model';
import { of } from 'rxjs';
import { LoadingService } from 'src/app/rest-api/loading.service';

@Injectable()
export class ReferenceEffects {
  getReferenceData$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(referenceDataActions.getReferenceData),
        mergeMap(() => {
          this._loading.setLoading(true, 'request.url');
          return this.referenceAPIService.getReferenceData().pipe(
            map((reference: any) => {
              sessionStorage.setItem('reference', JSON.stringify(reference.data));
              return referenceDataActions.getReferenceDataSuccess({ payload: reference.data });
            }),
            catchError((error: ErrorResponse) => {
              this._loading.setLoading(false, 'request.url');
              sessionStorage.removeItem('token');
              sessionStorage.removeItem('user');
              this.router.navigate(['/unauthorized']);
              return of(referenceDataActions.getReferenceDataFailure({ payload: error }))
            })
          )
        })
      )
  });


  constructor(private _loading: LoadingService, private router: Router, private actions$: Actions, private referenceAPIService: ReferenceAPIService) {}
}
