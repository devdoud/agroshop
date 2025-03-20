import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Final Cart items
    tempItems: [],  // Temporary items for updates
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if(existingItem){
                existingItem.quantity += 1
            } else {
                state.items.push({...action.payload, quantity:1})
            }
            state.tempItems = [...state.items]
            // console.log(typeof(item.price))
            state.totalPrice = state.items.reduce((sum, item) => sum+item.price*item.quantity, 0)
        },
        updateTempQuantity(state, action){
            const tempItem =  state.tempItems.find(item => item.id === action.payload.id)
            if(tempItem){
                tempItem.quantity = action.payload.quantity
            }
        },
        applyTempUpdate(state, action){
            const tempItem = state.tempItems.find((item) => item.id === action.payload)
            const cartItem = state.items.find((item) => item.id === action.payload)

            if(cartItem && tempItem) {
                cartItem.quantity = tempItem.quantity
            }

            state.totalPrice = state.items.reduce((sum, item) => sum+item.price*item.quantity, 0)
        },
        // changeQuantity(state, action) {
        //     const { id, quantity } = action.payload;
        //     const indexProductId = (state.items).findIndex(item => item.id === id);

        //     if(quantity > 0) {
        //         state.items[indexProductId].quantity = quantity;
        //     } else {
        //         state.items = (state.items).filter(item => item.id !== id);
        //     }
        //     state.tempItems = [...state.items];
        // },
        removeFromCart(state, action){
            state.items = state.items.filter(item => item.id !== action.payload);
            state.tempItems = [...state.items];

            state.totalPrice = state.items.reduce((sum, item) => sum+item.price*item.quantity, 0)
        }
    }
})

export const {addToCart, updateTempQuantity, removeFromCart, applyTempUpdate} = cartSlice.actions;

export default cartSlice.reducer;