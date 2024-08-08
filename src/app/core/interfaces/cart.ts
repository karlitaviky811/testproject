export interface CartItem {
    itemName: String;
    itemType: 'ROBOT' | 'STRATEGY' | 'LICENSE';
    itemElementId: number;
    itemPrice: number;
    quantity: number;
    totalPrice: number;
    shoppingCartId: number;
}