import { createAction, props } from '@ngrx/store';
import { ErrorResponse } from 'src/app/rest-api/common/models/error.model';
import { ReferenceResponseModel } from 'src/app/rest-api/reference-api/models/reference-api.model';

export const getReferenceData = createAction('[REFERENCE MODULE] Get reference data profile');

export const getReferenceDataSuccess = createAction(
  '[REFERENCE MODULE] Get reference data success',
  props<{ payload: ReferenceResponseModel }>()
);

export const getReferenceDataFailure = createAction(
  '[REFERENCE MODULE] Get reference data failure',
  props<{ payload: ErrorResponse }>()
);
