import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelFiltersComponent } from './panel-filters.component';

describe('PanelFiltersComponent', () => {
  let component: PanelFiltersComponent;
  let fixture: ComponentFixture<PanelFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
