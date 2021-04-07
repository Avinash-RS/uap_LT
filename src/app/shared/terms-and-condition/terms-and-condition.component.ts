import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'app-terms-and-condition',
    templateUrl: './terms-and-condition.component.html',
    styleUrls: ['./terms-and-condition.component.scss']
})

export class TermsAndConditionComponent implements OnInit {
    @Input() showTerms: boolean;
    @Output() hideTerms: EventEmitter<boolean> = new EventEmitter();

    ngOnInit(): void {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.showTerms) {
                this.toggleTermsAndCondition();
            }
        });
    }

    toggleTermsAndCondition(): void {
        this.hideTerms.emit();
    }
}
