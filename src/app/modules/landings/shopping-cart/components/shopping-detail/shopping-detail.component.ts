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
  subtotal = computed(
    () =>
      this.purchaseService.cartItem().itemsExtra.reduce(function (acc, obj) {
     console.log('calculate',acc,obj, obj.itemPrice,  obj.itemPrice * obj.quantity, )
        return acc + obj.itemPrice * obj.quantity;
      }, 0) + this.purchaseService.cartItem().totalPrice
      
  );


  ngOnInit(): void {
      console.log('this.sun',this.purchaseService.subTotalShoppingAmount())
  
  }
  goCheckout() {
    this.show = true;
    this.router.navigate(['site/payment-methods']);
    this.show = false;
  }
}
