import { Component } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-purchasing-process',
  standalone: true,
  imports: [StepperModule,ButtonModule],
  templateUrl: './purchasing-process.component.html',
  styleUrl: './purchasing-process.component.scss'
})
export default class PurchasingProcessComponent {
  active: number | undefined = 0;
  

}
