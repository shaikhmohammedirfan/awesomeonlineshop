import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpOptionsComponent } from './sign-up-options.component';

describe('SignUpOptionsComponent', () => {
  let component: SignUpOptionsComponent;
  let fixture: ComponentFixture<SignUpOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
