import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class CartService {
  private _products: Product[] = [];
    httpClient: any;
constructor(private http: HttpClient, private router: Router){}
  get products() {
    return this._products;
  }

  updateCart(product: Product) {
    this._products = [...this._products, product];
  }

  intentPaymentToken(token : any) {
    console.log('heeeereee', token)
    
   var Token = token;
    let httpOptions = {
      headers: new HttpHeaders({
        'X-Access-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSIsInBob25lIjoiKzEyMzQ1Njc4OTAiLCJhZGRyZXNzIjoiMTIzIE1haW4gU3QsIENpdHkiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzIyOTY1MjA0LCJleHAiOjE3MjI5Nzk2MDR9.WRiH_sOPOsvXh8IEQD_CpkbpWmnA0Dd4Gb4t6HnFPZQ',
      }),
    };


    return this.http.post('http://localhost:3000/shopping-cart/paymentIntent',{headers: httpOptions})
  }
}
