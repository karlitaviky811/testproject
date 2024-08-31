import { Component, OnInit, Signal, inject, signal } from "@angular/core";
import { Product } from "../../../../../core/interfaces/product";
import { ProductService } from "../../../../../core/services/product_service";
import { PurchaseService } from "../../../../../core/services/purchase_service";
import { CartItem } from "../../../../../core/interfaces/shopping_cart";
import { forkJoin } from "rxjs";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "fwa-cart",
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.scss",
})
export class CartComponent implements OnInit {
  readonly purchaseService = inject(PurchaseService);
  visible: boolean = false;
  cities: any;
  formbuilder = inject(FormBuilder);
  userInformationForm: FormGroup;

  constructor() {
    this.userInformationForm = this.formbuilder.group({
      code: [""],
    });
  }
  ngOnInit(): void {
    this.purchaseService.shoppingCartByUser().subscribe({
      next: async (res) => {
        await this.purchaseService.updateShoppingCart(res);
        let subtotalRobots = 0;
        let subtotal = 0;
        res.map((data: any) => {
          subtotal =
            data.itemsExtra.reduce(function (acc: any, obj: any) {
              console.log("itemsExtra", obj);
              return acc + Number(obj.totalPrice) * obj.quantity;
            }, 0) + Number(data.totalPrice);
          subtotalRobots = subtotal + subtotalRobots;
        });
        this.purchaseService.subTotalShoppingAmount.set(subtotalRobots);
      },
    });
    this.getDescountTicket();
  }

  private calSubTotal(robots: any) {
    let subtotal = 0;
    robots.map((data: any) => {
      var [itemsExtra] = this.purchaseService.shoppingCart();
      subtotal = itemsExtra.itemsExtra.reduce(function (acc, obj) {
        return acc + obj.totalPrice * obj.quantity;
      }, 0);

      subtotal = subtotal + Number(itemsExtra.totalPrice);
    });
    this.purchaseService.subtotal.set(subtotal);
  }

  updateQuantity(item: CartItem, value: number) {
    item.quantity += value;
    item.totalPrice = this.getPrice(item) * item.quantity;

    this.calSubTotal(item);
  }

  deleteCartItem(item: CartItem) {
    this.purchaseService.deleteProduct(item.id!).subscribe({
      next: (res) => {
        console.log("resss", res);
        this.purchaseService.shoppingCartByUser().subscribe({
          next: (robot) => {
            this.purchaseService.deleteCartItem(item, robot);
          },
        });
      },
    });
  }

  updateShoppingCart() {
    const sources: any[] = [];

    this.purchaseService.shoppingCart().forEach((cartItem) => {
      sources.push(
        this.purchaseService.updateProduct({
          id: cartItem.id,
          quantity: cartItem.quantity,
          totalPrice: Number(cartItem.totalPrice),
        })
      );
    });

    forkJoin(sources).subscribe({
      next: (res) => {
        console.log("shopping cart update: ", res);
      },
    });
  }

  getPrice(item: CartItem): number {
    return (
      item.itemsExtra.reduce(
        (acc, obj) => acc + obj.itemPrice * obj.quantity,
        0
      ) + Number(item.totalPrice)
    );
  }

  showDialog() {
    this.visible = true;
  }

  getDescountTicket() {
    this.purchaseService.getTicketDescount().subscribe((res) => {
      console.log("res", res);
      this.cities = res.data;
    });
  }
}
