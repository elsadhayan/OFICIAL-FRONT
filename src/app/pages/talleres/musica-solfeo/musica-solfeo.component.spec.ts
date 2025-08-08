import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicaSolfeoComponent } from './musica-solfeo.component';

describe('MusicaSolfeoComponent', () => {
  let component: MusicaSolfeoComponent;
  let fixture: ComponentFixture<MusicaSolfeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicaSolfeoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicaSolfeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
