import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';
import { setCart } from '../slices/Cart';

const fetchAllCartItems = createAsyncThunk('cart/fetchall', async (payload, thunkApi) => {
    try {
        const response = await api.getCart();
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

const createItem = (book, item = {}, quantity) => {
    const { title = book.title, id = book.id, count = 0, total = 0 } = item;

    return {
        title,
        id,
        count: count + quantity,
        total: total + book.price * quantity,
    };
};

export const fetchToAddItem = createAsyncThunk('cart/addItem', async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    try {
        const { books } = thunkApi.getState().bookList;
        const { cart } = thunkApi.getState().cartList;
        const book = books.find(({ id }) => id === payload);
        const item = cart.find(({ id }) => id === payload);

        const newItem = createItem(book, item, 1);

        if (!item) {
            api.addCartItem(newItem);
            return dispatch(setCart([...cart, newItem]))
        } else {
            api.updateCartItem(newItem);
            return dispatch(setCart(cart.map((el) => (newItem.id === el.id ? newItem : el))));
        }

    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})

export const fetchToRemoveItem = createAsyncThunk('create/removeItem', async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    try {
        const { books } = thunkApi.getState().bookList;
        const { cart } = thunkApi.getState().cartList;
        const book = books.find(({ id }) => id === payload);
        const item = cart.find(({ id }) => id === payload);

        const newItem = createItem(book, item, -1);

        if (item.count <= 1) {
            await api.deleteItem(payload);
            return dispatch(setCart(cart.filter(({ id }) => id !== payload)));
        } else {
            await api.updateCartItem(newItem);
            return dispatch(setCart(cart.map((el) => (newItem.id === el.id ? newItem : el))));
        }

    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const fetchToDeleteItem = createAsyncThunk('create/deleteItem', async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    try {
        const { cart } = thunkApi.getState().cartList;

        await api.deleteItem(payload);
        return dispatch(setCart(cart.filter(({ id }) => id !== payload)))
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})

export default fetchAllCartItems;