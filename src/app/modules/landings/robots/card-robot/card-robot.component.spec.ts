import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRobotComponent } from './card-robot.component';

describe('CardRobotComponent', () => {
  let component: CardRobotComponent;
  let fixture: ComponentFixture<CardRobotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRobotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
