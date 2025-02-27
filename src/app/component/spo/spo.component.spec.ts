import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoComponent } from './spo.component';

describe('SpoComponent', () => {
  let component: SpoComponent;
  let fixture: ComponentFixture<SpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
