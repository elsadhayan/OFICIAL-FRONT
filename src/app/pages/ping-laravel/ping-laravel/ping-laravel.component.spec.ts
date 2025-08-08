import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PingLaravelComponent } from './ping-laravel.component';

describe('PingLaravelComponent', () => {
  let component: PingLaravelComponent;
  let fixture: ComponentFixture<PingLaravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PingLaravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PingLaravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
