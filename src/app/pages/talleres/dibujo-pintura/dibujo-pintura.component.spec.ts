import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DibujoPinturaComponent } from './dibujo-pintura.component';

describe('DibujoPinturaComponent', () => {
  let component: DibujoPinturaComponent;
  let fixture: ComponentFixture<DibujoPinturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DibujoPinturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DibujoPinturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
