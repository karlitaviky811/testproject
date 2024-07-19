import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotStrategiesComponent } from './robot-strategies.component';

describe('RobotStrategiesComponent', () => {
  let component: RobotStrategiesComponent;
  let fixture: ComponentFixture<RobotStrategiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotStrategiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RobotStrategiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
