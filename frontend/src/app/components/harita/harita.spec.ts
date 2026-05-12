import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Harita } from './harita';

describe('Harita', () => {
  let component: Harita;
  let fixture: ComponentFixture<Harita>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Harita],
    }).compileComponents();

    fixture = TestBed.createComponent(Harita);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
