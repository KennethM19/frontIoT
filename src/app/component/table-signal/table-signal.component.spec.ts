import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSignalComponent } from './table-signal.component';

describe('TableSignalComponent', () => {
  let component: TableSignalComponent;
  let fixture: ComponentFixture<TableSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSignalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
