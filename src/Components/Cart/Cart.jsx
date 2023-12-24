import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Table, Button } from 'react-bootstrap';
import fetchAllCartItems, { fetchToAddItem, fetchToDeleteItem, fetchToRemoveItem } from '../../store/reducer/CartCreated';

const Cart = () => {
    const dispatch = useDispatch();
    const { cart, cartError, cartStatus } = useSelector((state) => state.cartList);

    useEffect(() => {
        dispatch(fetchAllCartItems());
    }, [dispatch]);

    const renderItem = (item, idx) => {
        const { title, id, count, total } = item;
        const onAddToCart = () => dispatch(fetchToAddItem(id));
        const onRemoveToCart = () => dispatch(fetchToRemoveItem(id));
        const onDeleteToCart = () => dispatch(fetchToDeleteItem(id));

        return (
            <tr key={`item-${id}`}>
                <td>{idx + 1}</td>
                <td>{title}</td>
                <td>{count}</td>
                <td>{total}$</td>
                <td>
                    <Button onClick={onAddToCart} className="mx-1" variant='outlin-success'>
                        <i className='fa-solid fa-plus'></i>
                    </Button>
                    <Button onClick={onRemoveToCart} className="mx-1" variant='outlin-success'>
                        <i className='fa-solid fa-minus'></i>
                    </Button>
                    <Button onClick={onDeleteToCart} className="mx-1" variant='outlin-success'>
                        <i className='fa-solid fa-trash'></i>
                    </Button>
                </td>
            </tr>
        )
    };

    const cases = {
        pending: <Spinner style={{ margin: '100px auto' }} />,
        // fulfilled: cart.map((item) => renderItem(item)),
        rejected: <div style={{ textAlign: 'center' }}>{cartError}</div>,
        empty: <div style={{ textAlign: 'center' }}>No data</div>,
    }

    return (
        <div>
            <h1>Your order</h1>
            {cartStatus === "fulfilled" ? (
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item</th>
                            <th>Count</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cart.map(renderItem)}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Итог:</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>{
                                cart.reduce((acc, rec) => {
                                    return acc + (rec.total)
                                }, 0)
                            }$</th>
                        </tr>
                    </tfoot>
                </Table>
            ) : (
                cases[cartStatus]
            )

            }


        </div>
    );
}

export default Cart;
