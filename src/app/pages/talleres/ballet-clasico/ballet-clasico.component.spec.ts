import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalletClasicoComponent } from './ballet-clasico.component';

describe('BalletClasicoComponent', () => {
  let component: BalletClasicoComponent;
  let fixture: ComponentFixture<BalletClasicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalletClasicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalletClasicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
