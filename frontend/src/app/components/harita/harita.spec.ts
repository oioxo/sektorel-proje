import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaritaComponent } from './harita';

describe('HaritaComponent', () => {
  let component: HaritaComponent;
  let fixture: ComponentFixture<HaritaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HaritaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HaritaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
