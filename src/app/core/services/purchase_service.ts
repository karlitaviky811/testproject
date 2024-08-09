import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { License } from "../interfaces/license";
import { Strategy } from "../interfaces/strategy";
import { CartItem } from "../interfaces/cart";
import { environment } from "../../../enviorement";
import { ENDPOINT } from "../constants/endpoints";
import { Observable, map } from "rxjs";

@Injectable()
export class PurchaseService {
    private readonly http = inject(HttpClient);

    private _selectedLicense: WritableSignal<License> = signal({} as License);
    private _selectedStrategies: WritableSignal<Strategy[]> = signal([]);
    private _shoppingCart: WritableSignal<CartItem[]> = signal([]);
    subtotal: WritableSignal<number> = signal(0);

    get selectedLicense(): License {
        return this._selectedLicense();
    }

    set selectedLicense(license: License) {
        this._selectedLicense.set(license);
    }

    get selectedStrategies(): Strategy[] {
        return this._selectedStrategies();
    }

    set selectedStrategies(strategies: Strategy[]) {
        this._selectedStrategies.set(strategies);
    }

    get shoppingCart(): WritableSignal<CartItem[]> {
        return this._shoppingCart;
    }

    updateShoppingCart(cartItem: CartItem[]) {
        this._shoppingCart.set([...cartItem]);
    }

    addItemToCart(cartItem: CartItem) {
        this._shoppingCart.update(value => [...value, cartItem]);
    }

    deleteCartItem(cartItem: CartItem) {
        const result = this._shoppingCart().filter(item => item.id != cartItem.id);
        const subtotal = result.reduce(function(acc, obj) { return acc + (obj.itemPrice * obj.quantity) }, 0);
        this.subtotal.set(subtotal);

        this._shoppingCart.set([...result]);
    }

    public addProduct(cartItem: CartItem) {
        return this.http.post<any>(`${environment.apiUrl}${ENDPOINT.addProduct}`, cartItem);
    }

    public updateProduct(value: any) {
        return this.http.put<any>(`${environment.apiUrl}${ENDPOINT.shopping_cart_update}`, value);
    }

    public deleteProduct(id: number) {
        return this.http.delete<any>(`${environment.apiUrl}${ENDPOINT.shopping_cart_delete}/${id}`);
    }

    public shoppingCartByUser(): Observable<CartItem[]> {
        return this.http.get<any>(`${environment.apiUrl}${ENDPOINT.shopping_cart}`).pipe(map(res => 
            res.items.map((item: any) => ({
                id: item.id,
                itemName: item.itemName,
                itemType: item.itemType,
                itemElementId: item.itemElementId,
                itemPrice: item.itemPrice,
                quantity: item.quantity,
                totalPrice: item.totalPrice,
            })) as CartItem[]
        ));
    }
}