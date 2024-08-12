import { Component, EventEmitter, Input, OnInit, Output, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Robot } from '../../../../../core/interfaces/robot';
import { PurchaseService } from '../../../../../core/services/purchase_service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-step-three-details',
  templateUrl: './step-three-details.component.html',
  styleUrl: './step-three-details.component.scss'
})
export class StepThreeDetailsComponent implements OnInit {
  @Input() robot = {} as Robot;
  @Output() prevCallback: EventEmitter<any> = new EventEmitter();

  private readonly router = inject(Router);
  readonly purchaseService = inject(PurchaseService);

  // subtotal = computed(() => this.purchaseService.shoppingCart().reduce(function(acc, obj) { return acc + (obj.itemPrice * obj.quantity) }, 0));
  subtotal = computed(() => this.purchaseService.cartItem().itemsExtra.reduce(function(acc, obj) { return acc + (obj.itemPrice * obj.quantity) }, 0) + this.purchaseService.cartItem().itemPrice);
  
  ngOnInit(): void {
    
  }

  goCart() {
    this.purchaseService.addProduct(this.purchaseService.cartItem())
      .subscribe({
        next: (res) => {
          console.log('created product: ', res);
        }
      });
    // const sources: any[] = [];
    // this.purchaseService.shoppingCart().forEach(cartItem => {
    //   sources.push(this.purchaseService.addProduct(cartItem));
    // });

    // forkJoin(sources).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.router.navigate(['site/shopping-cart']);
    //   }
    // });
    
  }
}
