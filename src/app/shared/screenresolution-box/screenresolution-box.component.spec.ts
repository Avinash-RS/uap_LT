import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenresolutionBoxComponent } from './screenresolution-box.component';

describe('ScreenresolutionBoxComponent', () => {
  let component: ScreenresolutionBoxComponent;
  let fixture: ComponentFixture<ScreenresolutionBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenresolutionBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenresolutionBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
