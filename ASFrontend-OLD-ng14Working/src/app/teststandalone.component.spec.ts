import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeststandaloneComponent } from './teststandalone.component';

describe('TeststandaloneComponent', () => {
  let component: TeststandaloneComponent;
  let fixture: ComponentFixture<TeststandaloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TeststandaloneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeststandaloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
