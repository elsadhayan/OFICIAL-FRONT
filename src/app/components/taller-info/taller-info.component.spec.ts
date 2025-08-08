import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallerInfoComponent } from './taller-info.component';

describe('TallerInfoComponent', () => {
  let component: TallerInfoComponent;
  let fixture: ComponentFixture<TallerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TallerInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TallerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
