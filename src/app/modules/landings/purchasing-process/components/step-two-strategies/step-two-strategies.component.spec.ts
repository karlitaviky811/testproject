import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTwoStrategiesComponent } from './step-two-strategies.component';

describe('StepTwoStrategiesComponent', () => {
  let component: StepTwoStrategiesComponent;
  let fixture: ComponentFixture<StepTwoStrategiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepTwoStrategiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepTwoStrategiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
