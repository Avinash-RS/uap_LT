import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_IMPORTS } from './app.imports';
import { HttpClientModule } from '@angular/common/http';
import { PrivilegeGuard } from './privilege.guard';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent],
  imports: [
    APP_IMPORTS,
    AppRoutingModule,
    BrowserAnimationsModule,
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
  providers: [PrivilegeGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
