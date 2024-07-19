import { Component, inject } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchasing-process',
  standalone: true,
  imports: [StepperModule,ButtonModule],
  templateUrl: './purchasing-process.component.html',
  styleUrl: './purchasing-process.component.scss'
})
export default class PurchasingProcessComponent {
  active: number | undefined = 0;
  router = inject(Router);
  onActiveIndexChange(e: any){
    console.log('hey')
  }

  goCart() {
    this.router.navigate(['site/shopping-cart']);
    // shopping-cart
  }
}
