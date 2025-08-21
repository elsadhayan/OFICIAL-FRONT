import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncioDirectorComponent } from './incio-director.component';

describe('IncioDirectorComponent', () => {
  let component: IncioDirectorComponent;
  let fixture: ComponentFixture<IncioDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncioDirectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncioDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
