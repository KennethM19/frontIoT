import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpmDisplayComponent } from './bpm-display.component';

describe('BpmDisplayComponent', () => {
  let component: BpmDisplayComponent;
  let fixture: ComponentFixture<BpmDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BpmDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BpmDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
