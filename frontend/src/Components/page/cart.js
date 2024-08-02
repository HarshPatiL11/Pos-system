import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Button } from 'antd';
import { removeFromCart } from '../Redux/cartSlice';
import AppLayout from '../layout/appLayout.js';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <AppLayout>
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={cartItems}
          renderItem={item => (
            <List.Item actions={[<Button type="primary" className='rmBtn' onClick={() => handleRemoveFromCart(item)}>Remove</Button>]}>
              <List.Item.Meta
                title={item.name}
                description={`Price: ₹ ${item.price}`}
              />
            </List.Item>
          )}
        />
      )}
    </div></AppLayout>
  );
};

export default Cart;
