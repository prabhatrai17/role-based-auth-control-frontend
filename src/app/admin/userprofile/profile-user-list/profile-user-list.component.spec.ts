import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserListComponent } from './profile-user-list.component';

describe('ProfileUserListComponent', () => {
  let component: ProfileUserListComponent;
  let fixture: ComponentFixture<ProfileUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileUserListComponent]
    });
    fixture = TestBed.createComponent(ProfileUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
