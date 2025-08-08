import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatusInscripcionesComponent } from './estatus-inscripciones.component';

describe('EstatusInscripcionesComponent', () => {
  let component: EstatusInscripcionesComponent;
  let fixture: ComponentFixture<EstatusInscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstatusInscripcionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstatusInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
