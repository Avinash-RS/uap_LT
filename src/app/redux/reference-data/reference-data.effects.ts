import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as referenceDataActions from './reference-data.actions';
import { Injectable } from '@angular/core';
import { catchError, mergeMap } from 'rxjs/operators';
import { ErrorResponse } from 'src/app/rest-api/common/models/error.model';
import { ReferenceAPIService } from 'src/app/rest-api/reference-api/reference-api.service';
import { ReferenceResponseModel } from 'src/app/rest-api/reference-api/models/reference-api.model';

@Injectable()
export class ReferenceEffects {
  getReferenceData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(referenceDataActions.getReferenceData),
      mergeMap(() =>
        this.referenceAPIService.getReferenceData().pipe(
          mergeMap((reference: ReferenceResponseModel) => [
            referenceDataActions.getReferenceDataSuccess({ payload: reference })
          ]),
          catchError((error: ErrorResponse) => [
            referenceDataActions.getReferenceDataFailure({ payload: error })
          ])
        )
      )
    )
  );

  constructor(private actions$: Actions, private referenceAPIService: ReferenceAPIService) {}
}
