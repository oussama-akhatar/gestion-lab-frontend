import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLaboratoireComponent } from './new-laboratoire.component';

describe('NewLaboratoireComponent', () => {
  let component: NewLaboratoireComponent;
  let fixture: ComponentFixture<NewLaboratoireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewLaboratoireComponent]
    });
    fixture = TestBed.createComponent(NewLaboratoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
