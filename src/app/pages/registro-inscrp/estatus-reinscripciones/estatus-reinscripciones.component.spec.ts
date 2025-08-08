import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatusReinscripcionesComponent } from './estatus-reinscripciones.component';

describe('EstatusReinscripcionesComponent', () => {
  let component: EstatusReinscripcionesComponent;
  let fixture: ComponentFixture<EstatusReinscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstatusReinscripcionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstatusReinscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
