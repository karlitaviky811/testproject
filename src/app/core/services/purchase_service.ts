import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { License } from "../interfaces/license";
import { Strategy } from "../interfaces/strategy";
import { CartItem } from "../interfaces/shopping_cart";
import { environment } from "../../../enviorement";
import { ENDPOINT } from "../constants/endpoints";
import { Observable, map, tap } from "rxjs";
import { SpinnerService } from "./spinner_service";

@Injectable()
export class PurchaseService {
    private readonly http = inject(HttpClient);

    private _selectedLicense: WritableSignal<License> = signal({} as License);
    private _selectedStrategies: WritableSignal<Strategy[]> = signal([]);
    private _shoppingCart: WritableSignal<CartItem[]> = signal([]);
    private _cartItem: WritableSignal<CartItem> = signal({} as CartItem);
    subtotal: WritableSignal<number> = signal(0);
    shoppingUser : WritableSignal<any> = signal([]);
    readonly spinnerService = inject(SpinnerService);

  
    get selectedLicense(): WritableSignal<License> {
        return this._selectedLicense;
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

    get cartItem(): WritableSignal<CartItem> {
        return this._cartItem;
    }

    set shoppingUserChange(data: any){
        this.shoppingUser.set([...data]);
    }

    get shoppingUserData() : WritableSignal<any>{
        return this.shoppingUser;
    }

    updateCartItem(cartItem: CartItem) {
        this._cartItem.set({...cartItem});
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
        this.spinnerService.updateLoading(true);

        return this.http.put<any>(`${environment.apiUrl}${ENDPOINT.shopping_cart_update}`, value).pipe(tap(() => {
            this.spinnerService.updateLoading(false);
        }));
    }

    public deleteProduct(id: number) {
        return this.http.delete<any>(`${environment.apiUrl}${ENDPOINT.shopping_cart_delete}/${id}`);
    }

    public shoppingCartByUser(): Observable<CartItem[]> {
        this.spinnerService.updateLoading(true);

        return this.http.get<any>(`${environment.apiUrl}${ENDPOINT.shopping_cart}`).pipe(map(res => 
            res.items.map((item: any) => ({
                id: item.id,
                itemName: item.itemName,
                itemType: item.itemType,
                itemElementId: item.itemElementId,
                itemPrice: item.itemPrice,
                quantity: item.quantity,
                totalPrice: item.totalPrice,
                itemsExtra: item.itemsExtra
            })) as CartItem[]
        ),
        tap(() => {
            this.spinnerService.updateLoading(false);
        }));
    }
}