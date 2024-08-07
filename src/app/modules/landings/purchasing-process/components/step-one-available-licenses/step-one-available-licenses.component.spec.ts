import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepOneAvailableLicensesComponent } from './step-one-available-licenses.component';

describe('StepOneAvailableLicensesComponent', () => {
  let component: StepOneAvailableLicensesComponent;
  let fixture: ComponentFixture<StepOneAvailableLicensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepOneAvailableLicensesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepOneAvailableLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
