import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { Product } from '../../../../../core/interfaces/product';
import { ProductService } from '../../../../../core/services/product_service';
import { PurchaseService } from '../../../../../core/services/purchase_service';
import { CartItem } from '../../../../../core/interfaces/cart';

@Component({
  selector: 'fwa-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  counter = signal(1);
  products: Product[] = []; 

  private readonly productService = inject(ProductService);
  purchaseService = inject(PurchaseService);

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    const subtotal = this.purchaseService.shoppingCart().reduce(function(acc, obj) { return acc + (obj.itemPrice * obj.quantity);}, 0);
    this.purchaseService.subtotal.set(subtotal);

  }

  increaseCounter(item: CartItem, value: number) {
    item.quantity = item.quantity + value;
    item.totalPrice = item.quantity * item.itemPrice;

    const subtotal = this.purchaseService.shoppingCart().reduce(function(acc, obj) { return acc + (obj.itemPrice * obj.quantity);}, 0);
    this.purchaseService.subtotal.set(subtotal);
  }

  deleteCartItem(item: CartItem) {
    this.purchaseService.deleteCartItem(item);
  }
}
