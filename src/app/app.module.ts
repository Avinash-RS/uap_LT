import { CustomSnackBarModule } from './shared/custom-snack-bar-content/index';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_IMPORTS } from './app.imports';
import { HttpClientModule } from '@angular/common/http';
import { PrivilegeGuard } from './privilege.guard';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material/material.module';
import { PrivilegeAutoLogoutGuard } from './privilege-auto-logout.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    APP_IMPORTS,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    CustomSnackBarModule,
    HttpClientModule,
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        preventDuplicates: true,
        maxOpened:3,
        autoDismiss:true,
        // progressBar:true,
        // progressAnimation:'increasing',
        closeButton:true
      }
    ),
  ],
  providers: [PrivilegeGuard, PrivilegeAutoLogoutGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
