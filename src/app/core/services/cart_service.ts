import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class CartService {

    constructor(private http: HttpClient){}

    intentPaymentToken(token : any, amount: any) {
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