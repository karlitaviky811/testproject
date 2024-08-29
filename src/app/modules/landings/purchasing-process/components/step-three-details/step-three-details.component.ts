import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  computed,
  inject,
} from "@angular/core";
import { Router } from "@angular/router";
import { Robot } from "../../../../../core/interfaces/robot";
import { PurchaseService } from "../../../../../core/services/purchase_service";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-step-three-details",
  templateUrl: "./step-three-details.component.html",
  styleUrl: "./step-three-details.component.scss",
})
export class StepThreeDetailsComponent implements OnInit {
  @Input() robot = {} as Robot;
  @Output() prevCallback: EventEmitter<any> = new EventEmitter();
  show = false;
  private readonly router = inject(Router);
  readonly purchaseService = inject(PurchaseService);

  // subtotal = computed(() => this.purchaseService.shoppingCart().reduce(function(acc, obj) { return acc + (obj.itemPrice * obj.quantity) }, 0));
  subtotal = computed(
    () =>
      this.purchaseService.cartItem().itemsExtra.reduce(function (acc, obj) {
     console.log('calculate',acc,obj, obj.itemPrice,  obj.itemPrice * obj.quantity, )
        return acc + obj.itemPrice * obj.quantity;
      }, 0) + this.purchaseService.cartItem().totalPrice
      
  );

  ngOnInit(): void {
  }

  goCart() {
    this.show = true;
    const item = this.purchaseService.cartItem();
    item.itemsExtra.map(i=>{
      if(i.itemType == 'LICENSE'){
        i.totalPrice = 0;
        i.itemPrice = 0
      }
    })

    
    this.purchaseService.addProduct(item).subscribe({
      next: (res) => {
        this.router.navigate(["site/shopping-cart"]);
        this.show = false;
      },
    });
  }
}
