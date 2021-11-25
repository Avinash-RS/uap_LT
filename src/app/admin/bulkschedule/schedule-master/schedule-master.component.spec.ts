import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleMasterComponent } from './schedule-master.component';

describe('ScheduleMasterComponent', () => {
  let component: ScheduleMasterComponent;
  let fixture: ComponentFixture<ScheduleMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
