export interface CartItem {
    id?: number,
    itemName: String;
    itemType: 'ROBOT' | 'STRATEGY' | 'LICENSE';
    itemElementId: number;
    itemPrice: any;
    quantity: number;
    totalPrice: any;
    shoppingCartId?: number;
    itemsExtra: ItemExtra[]
}

export type ItemExtra = Omit<CartItem, 'shoppingCarId' | 'itemsExtra'>;