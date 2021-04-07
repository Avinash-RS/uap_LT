import { createReducer, on, Action } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import {
  RefData,
  ReferenceAttributes
} from 'src/app/rest-api/reference-api/models/reference-api.model';
import * as referenceDataActions from './reference-data.actions';
import { initialState } from './reference-data.inital.states';
import { ReferenceState } from './reference-data.model';

export const referenceReducer = createReducer(
  initialState,
  on(referenceDataActions.getReferenceDataSuccess, (state, action) => ({
    ...state,
    reference: action.payload,
    // Dynamically grouping category with select menu options
    categoryWithMenuOptions: {
      data: action.payload.attributes.map((attribute: ReferenceAttributes) => {
        return {
          name: attribute.category.name,
          menuOptions: attribute.category.refData.map((menuOption: RefData) => {
            return {
              code: menuOption.code,
              decode: menuOption.decode
            };
          })
        };
      })
    }
  }))
);

export function reducer(state: ReferenceState | undefined, action: Action): ReferenceState {
  return referenceReducer(state, action);
}

export const selectCategoryWithMenuOptions = (state: AppState) =>
  state.reference.categoryWithMenuOptions;
