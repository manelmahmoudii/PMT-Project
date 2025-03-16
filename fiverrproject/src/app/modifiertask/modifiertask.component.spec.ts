import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiertaskComponent } from './modifiertask.component';

describe('ModifiertaskComponent', () => {
  let component: ModifiertaskComponent;
  let fixture: ComponentFixture<ModifiertaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifiertaskComponent]
    });
    fixture = TestBed.createComponent(ModifiertaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
