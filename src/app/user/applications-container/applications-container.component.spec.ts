import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsContainerComponent } from './applications-container.component';

describe('ApplicationsContainerComponent', () => {
  let component: ApplicationsContainerComponent;
  let fixture: ComponentFixture<ApplicationsContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationsContainerComponent]
    });
    fixture = TestBed.createComponent(ApplicationsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
