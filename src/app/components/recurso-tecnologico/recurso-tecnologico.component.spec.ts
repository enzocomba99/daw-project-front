import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoTecnologicoComponent } from './recurso-tecnologico.component';

describe('RecursoTecnologicoComponent', () => {
  let component: RecursoTecnologicoComponent;
  let fixture: ComponentFixture<RecursoTecnologicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecursoTecnologicoComponent]
    });
    fixture = TestBed.createComponent(RecursoTecnologicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
