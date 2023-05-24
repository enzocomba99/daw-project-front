import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacioFisicoComponent } from './espacio-fisico.component';

describe('EspacioFisicoComponent', () => {
  let component: EspacioFisicoComponent;
  let fixture: ComponentFixture<EspacioFisicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspacioFisicoComponent]
    });
    fixture = TestBed.createComponent(EspacioFisicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
