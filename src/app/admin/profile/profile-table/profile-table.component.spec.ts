import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTableComponent } from './profile-table.component';

describe('ProfileTableComponent', () => {
  let component: ProfileTableComponent;
  let fixture: ComponentFixture<ProfileTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileTableComponent]
    });
    fixture = TestBed.createComponent(ProfileTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
