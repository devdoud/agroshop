import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/shopCarts/cartSlice';

export default configureStore ({
    reducer: {
        cart: cartReducer
    }
})