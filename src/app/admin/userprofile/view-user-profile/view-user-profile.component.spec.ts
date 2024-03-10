import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserProfileComponent } from './view-user-profile.component';

describe('ViewUserProfileComponent', () => {
  let component: ViewUserProfileComponent;
  let fixture: ComponentFixture<ViewUserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewUserProfileComponent]
    });
    fixture = TestBed.createComponent(ViewUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
