import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarTalleresComponent } from './gestionar-talleres.component';

describe('GestionarTalleresComponent', () => {
  let component: GestionarTalleresComponent;
  let fixture: ComponentFixture<GestionarTalleresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarTalleresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarTalleresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
