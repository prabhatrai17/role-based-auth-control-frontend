import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserProfileComponent } from './add-user-profile.component';

describe('AddUserProfileComponent', () => {
  let component: AddUserProfileComponent;
  let fixture: ComponentFixture<AddUserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserProfileComponent]
    });
    fixture = TestBed.createComponent(AddUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
