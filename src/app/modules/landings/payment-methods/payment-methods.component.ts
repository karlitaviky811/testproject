import { Component, inject, signal, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { MessagesModule } from "primeng/messages";

import { CommonModule } from "@angular/common";
import { BannerComponent } from "./components/banner/banner.component";
import { RadioButtonModule } from "primeng/radiobutton";

import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";

import { CheckboxModule } from "primeng/checkbox";
import { NgxStripeModule, StripeCardComponent } from "ngx-stripe";
import {
  StripeCardElementOptions,
  StripeElementsOptionsClientSecret,
} from "@stripe/stripe-js";
import { TabViewModule } from "primeng/tabview";

import { injectStripe, StripePaymentElementComponent } from "ngx-stripe";
import {
  StripeElementsOptions,
  StripePaymentElementOptions,
} from "@stripe/stripe-js";
import { CartService } from "../../../core/services/cart_service";
import { AuthService } from "../../../core/services/auth_service";
import { PurchaseService } from "../../../core/services/purchase_service";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
@Component({
  selector: "app-payment-methods",
  standalone: true,
  imports: [
    FormsModule,
    CheckboxModule,
    FormsModule,
    CheckboxModule,
    CommonModule,
    ReactiveFormsModule,
    StripePaymentElementComponent,
    MessagesModule,
    RadioButtonModule,
    TabViewModule,
    NgxStripeModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: "./payment-methods.component.html",
  styleUrl: "./payment-methods.component.scss",
})
export default class PaymentMethodsComponent {
  checked = "tdc";
  router = inject(Router);
  messages: any = "Pago realizado exitosamente...";
  private readonly routerService = inject(Router);
  goCart() {
    this.router.navigate(["site/shopping-cart"]);
  }

  cart = inject(CartService);
  amountPayment = inject(PurchaseService);
  authService = inject(AuthService);
  readonly purchaseService = inject(PurchaseService);
  stripe = injectStripe(
    "pk_test_51PHqym082Z2VYEr0O4ijmmnqb7YRBD5pCmbtDd4PSN9PJrrIQyKVhgE6gAAMYogrUun0pxhn7IWJJQ8yBxovANXv00XJ5pbew2"
  );
  paying = signal(false);
  billing: any;
  amount = 100;
  show = false;
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;
  // Replace with your own public key
  checkoutForm: any;
  private readonly fb = inject(UntypedFormBuilder);
  userObject: any = localStorage.getItem("userObject");
  confirmationService!: ConfirmationService;
  messageService!: MessageService;
  constructor() {
    this.confirmationService = inject(ConfirmationService);
    this.messageService = inject(MessageService);
  }
  paymentElementForm = this.fb.group({
    name: ["Ricardo", [Validators.required]],
    email: ["support@ngx-stripe.dev", [Validators.required]],
    address: ["Av. Ramon Nieto 313B 2D", [Validators.required]],
    zipcode: ["36205", [Validators.required]],
    city: ["Vigo", [Validators.required]],
    amount: [2500, [Validators.required, Validators.pattern(/\d+/)]],
  });

  elementsOptions: StripeElementsOptions = {
    locale: "en",
    appearance: {
      theme: "flat",
    },
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: "tabs",
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false,
    },
  };

  ngOnInit(): void {
 
    //this.checkoutForm.set
    let userObject: any = localStorage.getItem("userObject");
    let user = JSON.parse(userObject)
    this.paymentElementForm.patchValue(user.user)
    this.purchaseService.shoppingCartByUser().subscribe({
      next: async (res) => {
        await this.purchaseService.updateShoppingCart(res);
        let subtotalRobots = 0;
        let subtotal = 0;
        res.map((data: any) => {
          subtotal =
            data.itemsExtra.reduce(function (acc: any, obj: any) {
              return acc + Number(obj.totalPrice) * obj.quantity;
            }, 0) + Number(data.totalPrice);
          subtotalRobots = subtotal + subtotalRobots;
        });
        this.purchaseService.subTotalShoppingAmount.set(subtotalRobots);

        this.amount = this.amountPayment.subTotalShoppingAmount();
      },
    });
  }

  pay() {
    if (this.paying() || this.paymentElementForm.invalid) return;
    this.paying.set(true);
   
    const { name, email, address, zipcode, city } =
      this.paymentElementForm.getRawValue();

      this.confirmationService.confirm({
        header: "Esta seguro de los datos ingresados?",
        message: "Por favor acepte, para continuar",
        accept: () => {

          this.stripe
          .confirmPayment({
            elements: this.paymentElement.elements,
            confirmParams: {
              payment_method_data: {
                billing_details: {
                  name: name as string,
                  email: email as string,
                  address: {
                    line1: address as string,
                    postal_code: zipcode as string,
                    city: city as string,
                  },
                },
              },
            },
            redirect: "if_required",
          })
          .subscribe((result : any) => {
            this.paying.set(false);
            if (result.error) {
              // Show error to your customer (e.g., insufficient funds)
              this.messages= [
                { severity: 'warn', summary: result.error.message  }
            ];
            } else {
              // The payment has been processed!
              const { status } =result;
            
              if (result.paymentIntent.status == "succeeded") {
                let obj = {
                  externalId: result.paymentIntent.id,
                  amount: this.amount.toString(),
                  paymentMethod: "STRIPE",
                  approved: true,
                  billingId: this.billing.id,
                };
                this.cart.registerPayment(obj).subscribe({
                 
                  next: ()=>{
                    
                    this.messageService.add({
                      severity: "success",
                      summary: "Success",
                      detail: "Pago realizado exitosamente",
                      life: 3000,
                    });

                    setTimeout(() => {
                      this.routerService.navigate(['/admin/shopping']);
                    }, 2000);
                  },
                  error: ()=>{
                    this.messages= [
                      { severity: 'success', summary: 'Pago realizado exitosamente'  }
                    ]
                    this.messageService.add({
                      severity: "success",
                      summary: "Success",
                      detail: "Pago realizado exitosamente",
                      life: 3000,
                    });
                    setTimeout(() => {
                      //this.routerService.navigate(['/admin/shopping']);
                    }, 2000);
                  }
                });
                // Show a success message to your customer
              }else{
                this.messageService.add({
                  severity: "error",
                  summary: "Error",
                  detail: "Pago realizado exitosamente",
                  life: 3000,
                });
                setTimeout(() => {
                  //this.routerService.navigate(['/admin/shopping']);
                }, 2000);
              }
            }
          });
        },
        reject: () => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Ha cancelado el pago",
            life: 3000,
          });
        },
        
      
      })


   
  }

  continue(){
    var token = this.authService.getToken();
    this.show = true;
    var token = this.authService.getToken();
    this.cart
      .intentPaymentToken(token, this.amount.toString())
      .subscribe((res: any) => {
        this.elementsOptions.clientSecret = res.client_secret;
        this.cart.registerByShoppingCart().subscribe((res) => {
          this.billing = res;

          console.log('res', res)
          this.show = false
        });
      });

  }
}
