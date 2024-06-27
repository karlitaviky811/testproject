import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenifitComponent } from './benifit/benifit.component';
import { BannerComponent } from './banner/banner.component';



@NgModule({
  declarations: [
    BenifitComponent,
    BannerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BenifitComponent,
    BannerComponent
  ]
})
export class HomeModule { }
