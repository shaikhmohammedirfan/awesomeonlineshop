import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackNotifierComponent } from './snack-notifier.component';

describe('SnackNotifierComponent', () => {
  let component: SnackNotifierComponent;
  let fixture: ComponentFixture<SnackNotifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackNotifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
