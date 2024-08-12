import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { Product } from '../../../../../core/interfaces/product';
import { ProductService } from '../../../../../core/services/product_service';
import { PurchaseService } from '../../../../../core/services/purchase_service';
import { CartItem } from '../../../../../core/interfaces/shopping_cart';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'fwa-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  readonly purchaseService = inject(PurchaseService);

  ngOnInit(): void {
    this.purchaseService.shoppingCartByUser()
      .subscribe({
        next: (res) => {
          this.purchaseService.updateShoppingCart(res);
          this.calSubTotal();
        }
      });
  }

  private calSubTotal() {
    const subtotal = this.purchaseService.shoppingCart().reduce(function(acc, obj) { return acc + (obj.itemPrice * obj.quantity);}, 0);
    this.purchaseService.subtotal.set(subtotal);
  }

  updateQuantity(item: CartItem, value: number) {
    item.quantity += value;
    item.totalPrice = item.itemPrice * item.quantity;

    this.calSubTotal();
  }

  deleteCartItem(item: CartItem) {
    this.purchaseService.deleteProduct(item.id!)
      .subscribe({
        next: () => {
          this.purchaseService.deleteCartItem(item);
        }
      });
  }

  updateShoppingCart() {
    const sources: any[] = [];
    
    this.purchaseService.shoppingCart().forEach(cartItem => {
      sources.push(this.purchaseService.updateProduct({
        id: cartItem.id,
        quantity: cartItem.quantity,
        totalPrice: Number(cartItem.totalPrice),
      }))
    });
    
    forkJoin(sources).subscribe({
      next: (res) => {
        console.log('shopping cart update: ', res);
      }
    });
  }
}
