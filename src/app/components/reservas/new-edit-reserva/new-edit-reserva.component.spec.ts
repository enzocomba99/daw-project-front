import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditReservaComponent } from './new-edit-reserva.component';

describe('NewEditReservaComponent', () => {
  let component: NewEditReservaComponent;
  let fixture: ComponentFixture<NewEditReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewEditReservaComponent]
    });
    fixture = TestBed.createComponent(NewEditReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
