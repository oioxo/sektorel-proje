import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlcumPanel } from './olcum-panel';

describe('OlcumPanel', () => {
  let component: OlcumPanel;
  let fixture: ComponentFixture<OlcumPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlcumPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(OlcumPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
