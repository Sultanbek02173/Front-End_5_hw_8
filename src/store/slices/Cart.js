import { createSlice } from '@reduxjs/toolkit';
import fetchAllCartItems from '../reducer/CartCreated';

const initialState = {
    cart: [],
    isLoading: false,
    cartError: '',
    cartStatus: 'panding',
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchAllCartItems.pending, (state, action) => {
            state.cartStatus = 'panding';
            state.cartError = '';
            state.cart = [];
            state.isLoading = true
        });

        builder.addCase(fetchAllCartItems.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.isLoading = false;

            if (action.payload.length) {
                state.cartStatus = 'fulfilled';
                return;
            }
            state.cartStatus = 'empty';

        });

        builder.addCase(fetchAllCartItems.rejected, (state, action) => {
            state.cartStatus = 'rejected';
            state.cartError = action.payload;
            state.isLoading = false;
        });
    },
});

const cartReducer = cartSlice.reducer;

export const { setCart } = cartSlice.actions;
export default cartReducer;