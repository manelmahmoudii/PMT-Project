import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterprojetComponent } from './ajouterprojet.component';

describe('AjouterprojetComponent', () => {
  let component: AjouterprojetComponent;
  let fixture: ComponentFixture<AjouterprojetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterprojetComponent]
    });
    fixture = TestBed.createComponent(AjouterprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
