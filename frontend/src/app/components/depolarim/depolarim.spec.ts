import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepolarimComponent } from './depolarim';

describe('DepolarimComponent', () => {
  let component: DepolarimComponent;
  let fixture: ComponentFixture<DepolarimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepolarimComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DepolarimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
