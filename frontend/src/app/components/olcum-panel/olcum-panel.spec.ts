import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlcumPanelComponent } from './olcum-panel';

describe('OlcumPanelComponent', () => {
  let component: OlcumPanelComponent;
  let fixture: ComponentFixture<OlcumPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlcumPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OlcumPanelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
