import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoDisplayComponent } from './spo-display.component';

describe('SpoDisplayComponent', () => {
  let component: SpoDisplayComponent;
  let fixture: ComponentFixture<SpoDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpoDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
