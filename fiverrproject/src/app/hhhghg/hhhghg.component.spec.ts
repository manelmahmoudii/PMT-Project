import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HhhghgComponent } from './hhhghg.component';

describe('HhhghgComponent', () => {
  let component: HhhghgComponent;
  let fixture: ComponentFixture<HhhghgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HhhghgComponent]
    });
    fixture = TestBed.createComponent(HhhghgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
