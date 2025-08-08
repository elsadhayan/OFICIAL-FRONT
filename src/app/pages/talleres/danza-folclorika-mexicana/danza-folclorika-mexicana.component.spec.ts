import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanzaFolclorikaMexicanaComponent } from './danza-folclorika-mexicana.component';

describe('DanzaFolclorikaMexicanaComponent', () => {
  let component: DanzaFolclorikaMexicanaComponent;
  let fixture: ComponentFixture<DanzaFolclorikaMexicanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanzaFolclorikaMexicanaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanzaFolclorikaMexicanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
