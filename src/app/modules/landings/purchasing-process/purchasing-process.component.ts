import { Component, inject, signal } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { PurchasingProcessModule } from './purchasing-process.module';
import { Lincense } from '../../../core/interfaces/license';

@Component({
  selector: 'app-purchasing-process',
  standalone: true,
  imports: [StepperModule,ButtonModule, PurchasingProcessModule],
  templateUrl: './purchasing-process.component.html',
  styleUrl: './purchasing-process.component.scss'
})
export default class PurchasingProcessComponent {
  active: number | undefined = 0;
  router = inject(Router);
  colors = ["Red", "Blue", "White"];
  licenses = signal([
    {
      id: 0,
      type: 'Bronce',
      price: '950,00',
      duration: '1 mes',
      strategies: '1',
    },
    {
      id: 1,
      type: 'Plata',
      price: '950,00',
      duration: '3 mes',
      strategies: '2',
    },
    {
      id: 2,
      type: 'Oro',
      price: '950,00',
      duration: '6 mes',
      strategies: '3',
    },
    {
      id: 3,
      type: 'Anual',
      price: '950,00',
      duration: '4 mes',
      strategies: '1',
    },
    {
      id: 4,
      type: 'Bianual',
      price: '950,00',
      duration: '4 mes',
      strategies: '2',
    },
    {
      id: 5,
      type: 'For live',
      price: '950,00',
      duration: 'Licencia de por vida',
      strategies: '5',
    }
  ]);

  onActiveIndexChange(e: any){
    console.log('hey')
  }

  goCart() {
    this.router.navigate(['site/shopping-cart']);
    // shopping-cart
  }
}
