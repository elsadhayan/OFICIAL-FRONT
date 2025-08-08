import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DibujoInfantilComponent } from './dibujo-infantil.component';

describe('DibujoInfantilComponent', () => {
  let component: DibujoInfantilComponent;
  let fixture: ComponentFixture<DibujoInfantilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DibujoInfantilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DibujoInfantilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
