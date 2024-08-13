import { Component, inject, signal, ViewChild  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesModule } from 'primeng/messages';

import { CommonModule } from "@angular/common";
import { BannerComponent } from "./components/banner/banner.component";

import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";

import { CheckboxModule } from "primeng/checkbox";
import { NgxStripeModule, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptionsClientSecret,
} from '@stripe/stripe-js';


import {
  injectStripe,
  StripePaymentElementComponent
} from 'ngx-stripe';
import {
  StripeElementsOptions, 
  StripePaymentElementOptions
} from '@stripe/stripe-js';
import { CartService } from '../../../core/services/cart_service';
import { AuthService } from '../../../core/services/auth_service';
import { PurchaseService } from '../../../core/services/purchase_service';
@Component({
  selector: 'app-payment-methods',
  standalone: true,
  imports: [FormsModule, CheckboxModule,  FormsModule,
    CheckboxModule,
    CommonModule,
    ReactiveFormsModule,
    StripePaymentElementComponent,
    MessagesModule,
    NgxStripeModule],
  templateUrl: './payment-methods.component.html',
  styleUrl: './payment-methods.component.scss'
})
export default class PaymentMethodsComponent {
  checked: boolean = false;
  router = inject(Router);
  messages: any = 'Pago realizado exitosamente...'

  
  goCart() {
    this.router.navigate(['site/shopping-cart']);
  }

  cart = inject(CartService);
  amountPayment = inject(PurchaseService)
  authService = inject(AuthService);
  stripe = injectStripe('pk_test_51PHqym082Z2VYEr0O4ijmmnqb7YRBD5pCmbtDd4PSN9PJrrIQyKVhgE6gAAMYogrUun0pxhn7IWJJQ8yBxovANXv00XJ5pbew2');
  paying = signal(false);
  billing: any;
  amount = 100;
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;
  // Replace with your own public key
  checkoutForm: any;
  private readonly fb = inject(UntypedFormBuilder);



  constructor(){
    console.log('paymentelement', this.paymentElement)
  }
  paymentElementForm = this.fb.group({
    name: ['Ricardo', [Validators.required]],
    email: ['support@ngx-stripe.dev', [Validators.required]],
    address: ['Av. Ramon Nieto 313B 2D', [Validators.required]],
    zipcode: ['36205', [Validators.required]],
    city: ['Vigo', [Validators.required]],
    amount: [2500, [Validators.required, Validators.pattern(/\d+/)]],
  });

  
  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'flat',
    },
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false
    }
  };


  ngOnInit(): void {
      var token = this.authService.getToken()
  
      var token = this.authService.getToken();
      this.amount = this.amountPayment.subtotal();
      this.cart.intentPaymentToken(token,Math.floor(this.amount)).subscribe( (res : any)=>{
        this.elementsOptions.clientSecret = res.client_secret

        this.cart.registerByShoppingCart().subscribe(res=>{
          this.billing = res;
       })
     }) 
   
  }

  pay() {
   
    if (this.paying() || this.paymentElementForm.invalid) return;
    this.paying.set(true);

    const {
      name,
      email,
      address,
      zipcode,
      city
    } = this.paymentElementForm.getRawValue();
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
                city: city as string
              }
            }
          }
        },
        redirect: 'if_required'
      })
      .subscribe(result => {
        this.paying.set(false);
        if (result.error) {
          
          // Show error to your customer (e.g., insufficient funds)
          alert({ success: false, error: result.error.message });
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            let obj = {
                 "externalId": result.paymentIntent.id,
                "amount":  Math.floor(this.amount).toString(),
                "paymentMethod": "STRIPE",
                "approved": true,
                "billingId": this.billing.id
              
            }
            this.cart.registerPayment(obj).subscribe(res=>{
              alert('Pago realizado exitosamente');
            })
            // Show a success message to your customer
         
          }
        }
      });
  }
}
