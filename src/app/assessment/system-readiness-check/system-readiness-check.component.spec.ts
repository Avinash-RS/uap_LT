import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemReadinessCheckComponent } from './system-readiness-check.component';

describe('SystemReadinessCheckComponent', () => {
  let component: SystemReadinessCheckComponent;
  let fixture: ComponentFixture<SystemReadinessCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemReadinessCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemReadinessCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
