import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermasterFormComponent } from './usermaster-form.component';

describe('UsermasterFormComponent', () => {
  let component: UsermasterFormComponent;
  let fixture: ComponentFixture<UsermasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsermasterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
