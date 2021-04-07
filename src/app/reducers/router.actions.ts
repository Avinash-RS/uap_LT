import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const go = createAction(
  '[Router] Go',
  props<{ payload: { path: any[]; query?: object } }>()
);
export const back = createAction('[Router] Back');
export const forward = createAction('[Router] Forward');
