import axios from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:5000' });

const getBook = () => instance.get('/books');
const getCart = () => instance.get('/cart');
const addCartItem = (payload) => instance.post('/cart', payload);
const updateCartItem = (payload) => instance.put(`/cart/${payload.id}`, payload);
const deleteItem = (payload) => instance.delete(`/cart/${payload}`);

export const api = {
    getBook,
    getCart,
    addCartItem,
    updateCartItem,
    deleteItem,
};