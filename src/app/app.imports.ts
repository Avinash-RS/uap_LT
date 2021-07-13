import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { RouterEffects } from './reducers/router.effects';
import { EffectsModule } from '@ngrx/effects';
import { CustomSerializer } from './reducers/custom-route-serializer';
import { AppRoutingModule } from './app-routing.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from 'src/environments/environment';
import { RestApiModule } from './rest-api';
import { UserEffects } from './redux/user/user.effects';
import { ReferenceEffects } from './redux/reference-data/reference-data.effects';
import { LoginEffects } from './login/redux/login.effects';
export const APP_IMPORTS = [
  BrowserModule,
  CommonModule,
  RestApiModule,
  StoreModule.forRoot(reducers, {
    metaReducers,
    runtimeChecks: {
      strictStateImmutability: false,
      strictActionImmutability: true
    }
  }),
  EffectsModule.forRoot([RouterEffects, UserEffects, ReferenceEffects, LoginEffects]),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  StoreRouterConnectingModule.forRoot({
    serializer: CustomSerializer
  }),
  AppRoutingModule
];
