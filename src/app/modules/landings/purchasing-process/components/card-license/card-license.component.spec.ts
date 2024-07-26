import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLicenseComponent } from './card-license.component';

describe('CardLicenseComponent', () => {
  let component: CardLicenseComponent;
  let fixture: ComponentFixture<CardLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardLicenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
