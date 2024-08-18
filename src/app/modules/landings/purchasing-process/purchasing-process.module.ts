import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { CardLicenseComponent } from './components/card-license/card-license.component';
import { StepOneAvailableLicensesComponent } from './components/step-one-available-licenses/step-one-available-licenses.component';
import { StepTwoStrategiesComponent } from './components/step-two-strategies/step-two-strategies.component';
import { StepThreeDetailsComponent } from './components/step-three-details/step-three-details.component';



@NgModule({
  declarations: [
    CardLicenseComponent,
    StepOneAvailableLicensesComponent,
    StepTwoStrategiesComponent,
    StepThreeDetailsComponent
  ],
  imports: [
    CommonModule,
    MessagesModule
  ],
  exports: [
    CardLicenseComponent,
    StepOneAvailableLicensesComponent,
    StepTwoStrategiesComponent,
    StepThreeDetailsComponent
  ]
})
export class PurchasingProcessModule { }
