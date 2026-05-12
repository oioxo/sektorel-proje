import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Depolarim } from './depolarim';

describe('Depolarim', () => {
  let component: Depolarim;
  let fixture: ComponentFixture<Depolarim>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Depolarim],
    }).compileComponents();

    fixture = TestBed.createComponent(Depolarim);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
