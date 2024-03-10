import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTableComponent } from './employee-table.component';

describe('EmployeeTableComponent', () => {
  let component: EmployeeTableComponent;
  let fixture: ComponentFixture<EmployeeTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeTableComponent]
    });
    fixture = TestBed.createComponent(EmployeeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
