import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserprofileComponent } from './manage-userprofile.component';

describe('ManageUserprofileComponent', () => {
  let component: ManageUserprofileComponent;
  let fixture: ComponentFixture<ManageUserprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUserprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
