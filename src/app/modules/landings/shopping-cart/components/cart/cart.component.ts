import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { Product } from '../../../../../core/interfaces/product';
import { ProductService } from '../../../../../core/services/product_service';

@Component({
  selector: 'fwa-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  counter = signal(1);
  products: Product[] = []; 

  private readonly productService = inject(ProductService);

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  increaseCounter(value: number) {
    this.counter.update(counter => counter + value);
  }
}
