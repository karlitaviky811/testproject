import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseService } from '../../../../../core/services/purchase_service';

@Component({
  selector: 'fwa-shopping-detail',
  templateUrl: './shopping-detail.component.html',
  styleUrl: './shopping-detail.component.scss'
})
export class ShoppingDetailComponent implements OnInit {
  router = inject(Router);
  purchaseService = inject(PurchaseService);
  show = false;
  // subtotal = computed(() => this.purchaseService.shoppingCart().reduce(function(acc, obj) { return acc + (obj.itemPrice * obj.quantity);}, 0));
  ngOnInit(): void {
      
  
  }
  goCheckout() {
    this.show = true;
    this.router.navigate(['site/payment-methods']);
    this.show = false;
  }
}
