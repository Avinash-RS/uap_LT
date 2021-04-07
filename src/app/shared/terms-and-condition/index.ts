import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TermsAndConditionComponent } from './terms-and-condition.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [CommonModule, MatIconModule],
    exports: [TermsAndConditionComponent],
    declarations: [TermsAndConditionComponent]
})

export class TermsAndConditionModule { }
