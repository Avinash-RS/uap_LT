import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
import { map, debounceTime, distinctUntilChanged, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() searchEvent = new EventEmitter<string>();
  @Input() searchPlaceHolder: string;
  searchForm: FormGroup;
  private alive: boolean;
  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: ['', Validators.nullValidator]
    });
  }
  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(
        map((data) => data.search),
        debounceTime(500),
        distinctUntilChanged(),
        takeWhile((_) => this.alive)
      )
      .subscribe((data) => {
        this.onSearch(data);
      });
    this.alive = true;
  }
  onClear(): void {
    this.search.reset();
  }

  get search(): FormControl {
    return this.searchForm.get('search') as FormControl;
  }
  onSearch(data: string): void {
    this.searchEvent.emit(data);
  }
  ngOnDestroy(): void {
    this.alive = false;
  }
}
