export interface CartItem {
    id: number,
    itemName: String;
    itemType: 'ROBOT' | 'STRATEGY' | 'LICENSE';
    itemElementId: number;
    itemPrice: number;
    quantity: number;
    totalPrice: number;
    shoppingCartId: number;
}