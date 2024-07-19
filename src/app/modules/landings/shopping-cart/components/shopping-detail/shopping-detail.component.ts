import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fwa-shopping-detail',
  templateUrl: './shopping-detail.component.html',
  styleUrl: './shopping-detail.component.scss'
})
export class ShoppingDetailComponent {
  router = inject(Router);

  goCheckout() {
    this.router.navigate(['site/payment-methods']);
  }
}
