import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenifitComponent } from './benifit.component';

describe('BenifitComponent', () => {
  let component: BenifitComponent;
  let fixture: ComponentFixture<BenifitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BenifitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenifitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
