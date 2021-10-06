import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutMasterComponent } from './logout-master.component';

describe('LogoutMasterComponent', () => {
  let component: LogoutMasterComponent;
  let fixture: ComponentFixture<LogoutMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
