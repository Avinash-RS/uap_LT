import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [RouterModule, MatMenuModule, MatIconModule],
  exports: [NavBarComponent],
  declarations: [NavBarComponent],
  providers: []
})
export class NavBarModule {}
