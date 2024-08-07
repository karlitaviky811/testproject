import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenifitComponent } from './benifit/benifit.component';


@NgModule({
  declarations: [
    BenifitComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BenifitComponent,
  ]
})
export class HomeModule { }
