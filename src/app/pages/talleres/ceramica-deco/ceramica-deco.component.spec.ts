import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeramicaDecoComponent } from './ceramica-deco.component';

describe('CeramicaDecoComponent', () => {
  let component: CeramicaDecoComponent;
  let fixture: ComponentFixture<CeramicaDecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CeramicaDecoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CeramicaDecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
