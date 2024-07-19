import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { PanelFiltersComponent } from './components/panel-filters/panel-filters.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PanelModule } from 'primeng/panel';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    BannerComponent,
    PanelFiltersComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    PanelModule,
    PaginatorModule
  ],
  exports: [
    BannerComponent,
    PanelFiltersComponent,
  ]
})
export class RobotStrategiesModule { }
