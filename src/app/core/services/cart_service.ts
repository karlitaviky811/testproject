import { inject, Injectable } from "@angular/core";
import { Product } from "../interfaces/product";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class CartService {
    private _products: Product[] = [];
    private http = inject(HttpClient)
    get products() {
        return this._products;
    }

    updateCart(product: Product) {
        this._products = [...this._products, product];
    }

    intentPaymentToken(token : any, amount: any) {
        console.log('heeeereee', token)
        
       var Token = token;
        let httpOptions = {
          headers: new HttpHeaders({
            'X-Access-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSIsInBob25lIjoiKzEyMzQ1Njc4OTAiLCJhZGRyZXNzIjoiMTIzIE1haW4gU3QsIENpdHkiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzIyOTY1MjA0LCJleHAiOjE3MjI5Nzk2MDR9.WRiH_sOPOsvXh8IEQD_CpkbpWmnA0Dd4Gb4t6HnFPZQ',
          }),
        };
    
        var obj = {
            "paymentMethod": "STRIPE",
            'amount': 200.00 * 1000
        }
    
        return this.http.post('https://api.fwa.qa.jacidi.com/billing/payment-intent',obj)
      }

}