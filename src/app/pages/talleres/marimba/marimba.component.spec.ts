import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarimbaComponent } from './marimba.component';

describe('MarimbaComponent', () => {
  let component: MarimbaComponent;
  let fixture: ComponentFixture<MarimbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarimbaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarimbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
