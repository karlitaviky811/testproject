import { Injectable } from "@angular/core";
import { Product } from "../interfaces/product";

@Injectable()
export class ProductService {
    getProducts(): Product[] {
        return [
            {
              id: 0,
              name: 'arbitraje basico',
              price: '240,00',
              image: 'img/robot_trading.png',
              strategiesAmount: 4,
              quantity: 1,
              descount: false,
              total: '',
            },
            {
              id: 0,
              name: 'arbitraje basico',
              price: '240,00',
              image: 'img/robot_trading.png',
              strategiesAmount: 4,
              quantity: 1,
              descount: false,
              total: '',
            },
            {
              id: 0,
              name: 'arbitraje basico',
              price: '240,00',
              image: 'img/robot_trading.png',
              strategiesAmount: 4,
              quantity: 1,
              descount: false,
              total: '',
            },
          ]; 
    }
}