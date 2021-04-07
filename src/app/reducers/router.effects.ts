import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as routerActins from './router.actions';
import { delay, map, tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(routerActins.go),
        map((action) => action.payload),
        delay(2000),
        tap(({ path, query: queryParams }) => this.router.navigate(path, { queryParams }))
      ),
    { dispatch: false }
  );

  navigateBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(routerActins.back),
        tap(() => this.location.back())
      ),
    { dispatch: false }
  );

  navigateForward$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(routerActins.forward),
        tap(() => this.location.forward())
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router, private location: Location) {}
}
