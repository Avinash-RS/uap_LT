import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchedulePackageComponent } from './edit-schedule-package.component';
import { FormsModule } from '@angular/forms';
describe('EditSchedulePackageComponent', () => {
  let component: EditSchedulePackageComponent;
  let fixture: ComponentFixture<EditSchedulePackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSchedulePackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSchedulePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
