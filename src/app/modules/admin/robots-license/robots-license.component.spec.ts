import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotsLicenseComponent } from './robots-license.component';

describe('RobotsLicenseComponent', () => {
  let component: RobotsLicenseComponent;
  let fixture: ComponentFixture<RobotsLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotsLicenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RobotsLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
