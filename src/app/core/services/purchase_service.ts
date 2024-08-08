import { Injectable, WritableSignal, signal } from "@angular/core";
import { License } from "../interfaces/license";
import { Strategy } from "../interfaces/strategy";
import { CartItem } from "../interfaces/cart";

@Injectable()
export class PurchaseService {
    private _selectedLicense: WritableSignal<License | undefined> = signal(undefined);
    private _selectedStrategies: WritableSignal<Strategy[]> = signal([]);
    private _shoppingCart: WritableSignal<CartItem[]> = signal([]);
    subtotal: WritableSignal<number> = signal(0);

    get selectedLicense(): License | undefined {
        return this._selectedLicense();
    }

    set selectedLicense(license: License | undefined) {
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

    addItemToCart(cartItem: CartItem) {
        this._shoppingCart.update(value => [...value, cartItem]);
    }

    deleteCartItem(cartItem: CartItem) {
        const result = this._shoppingCart().filter(item => item.itemName != cartItem.itemName);
        const subtotal = result.reduce(function(acc, obj) { return acc + (obj.itemPrice * obj.quantity);}, 0);
        this.subtotal.set(subtotal);

        this._shoppingCart.set([...result]);
    }
}