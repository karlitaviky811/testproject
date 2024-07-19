import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStrategyComponent } from './card-strategy.component';

describe('CardStrategyComponent', () => {
  let component: CardStrategyComponent;
  let fixture: ComponentFixture<CardStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardStrategyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
