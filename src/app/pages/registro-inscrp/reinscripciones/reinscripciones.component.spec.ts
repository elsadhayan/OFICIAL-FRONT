import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinscripcionesComponent } from './reinscripciones.component';

describe('ReinscripcionesComponent', () => {
  let component: ReinscripcionesComponent;
  let fixture: ComponentFixture<ReinscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReinscripcionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReinscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
