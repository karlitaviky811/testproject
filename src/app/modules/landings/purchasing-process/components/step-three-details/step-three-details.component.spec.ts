import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepThreeDetailsComponent } from './step-three-details.component';

describe('StepThreeDetailsComponent', () => {
  let component: StepThreeDetailsComponent;
  let fixture: ComponentFixture<StepThreeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepThreeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepThreeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
