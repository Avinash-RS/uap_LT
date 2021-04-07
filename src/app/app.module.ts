import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_IMPORTS } from './app.imports';
import { AuthConfigModule } from './auth-config.module';
import { HttpClientModule } from '@angular/common/http';
import { PrivilegeGuard } from './privilege.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    APP_IMPORTS,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthConfigModule,
    HttpClientModule
  ],
  providers: [PrivilegeGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
