import { Injectable } from "@angular/core";
import { Product } from "../interfaces/product";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class CartService {

    constructor(private http: HttpClient){}

    private _products: Product[] = [];

    get products() {
        return this._products;
    }

    updateCart(product: Product) {
        this._products = [...this._products, product];
    }

    intentPaymentToken(token : any, amount: any) {
        
       var Token = token;
        let httpOptions = {
          headers: new HttpHeaders({
            'X-Access-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSIsInBob25lIjoiKzEyMzQ1Njc4OTAiLCJhZGRyZXNzIjoiMTIzIE1haW4gU3QsIENpdHkiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzIyOTY1MjA0LCJleHAiOjE3MjI5Nzk2MDR9.WRiH_sOPOsvXh8IEQD_CpkbpWmnA0Dd4Gb4t6HnFPZQ',
          }),
        };
    
        var obj = {
            "paymentMethod": "STRIPE",
            'amount': amount
        }
    
        return this.http.post('https://api.fwa.qa.jacidi.com/billing/payment-intent',obj)
      }

      registerPayment(obj: any){

        return this.http.post('https://api.fwa.qa.jacidi.com/billing/register-payment',obj)

      }

      registerByShoppingCart(){
        return this.http.post('https://api.fwa.qa.jacidi.com/billing/register-by-shopping-cart',{})
      } 

      getAllShopping(idUser: any){
       return this.http.get(`https://api.fwa.qa.jacidi.com/billing/by-user/${idUser}?page=1&limit=10`)
      }
    

}