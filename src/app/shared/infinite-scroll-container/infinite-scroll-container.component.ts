import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll-container',
  templateUrl: './infinite-scroll-container.component.html',
  styleUrls: ['./infinite-scroll-container.component.scss']
})
export class InfiniteScrollContainerComponent implements OnInit {
  @Input() showLoading: boolean;
  @Output() scrolled = new EventEmitter<void>();
  selector = '.main-panel';
  ngOnInit(): void {}

  onScroll(): void {
    this.scrolled.emit();
  }
}
