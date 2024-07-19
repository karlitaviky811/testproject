import { Injectable } from "@angular/core";
import { Product } from "../interfaces/product";

@Injectable()
export class CartService {
    private _products: Product[] = [];

    get products() {
        return this._products;
    }

    updateCart(product: Product) {
        this._products = [...this._products, product];
    }

}