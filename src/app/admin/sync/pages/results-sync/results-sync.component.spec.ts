import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsSyncComponent } from './results-sync.component';

describe('ResultsSyncComponent', () => {
  let component: ResultsSyncComponent;
  let fixture: ComponentFixture<ResultsSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsSyncComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
