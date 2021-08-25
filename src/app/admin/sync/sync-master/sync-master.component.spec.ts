import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncMasterComponent } from './sync-master.component';

describe('SyncMasterComponent', () => {
  let component: SyncMasterComponent;
  let fixture: ComponentFixture<SyncMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyncMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
