import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifieruserComponent } from './modifieruser.component';

describe('ModifieruserComponent', () => {
  let component: ModifieruserComponent;
  let fixture: ComponentFixture<ModifieruserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifieruserComponent]
    });
    fixture = TestBed.createComponent(ModifieruserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
