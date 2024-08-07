import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-three-details',
  templateUrl: './step-three-details.component.html',
  styleUrl: './step-three-details.component.scss'
})
export class StepThreeDetailsComponent {
  @Output() prevCallback: EventEmitter<any> = new EventEmitter();
  router = inject(Router);

  
  goCart() {
    this.router.navigate(['site/shopping-cart']);
    // shopping-cart
  }
}
