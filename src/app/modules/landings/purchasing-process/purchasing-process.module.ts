import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardLicenseComponent } from './components/card-license/card-license.component';



@NgModule({
  declarations: [
    CardLicenseComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardLicenseComponent,
  ]
})
export class PurchasingProcessModule { }
