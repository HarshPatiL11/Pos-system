import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'antd';  
import { removeFromCart,addToCart } from '../Redux/cartSlice';
import AppLayout from '../layout/appLayout.js';
import {DeleteOutlined,PlusSquareOutlined} from "@ant-design/icons";
import '../css/Cart.css'
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'name',
      key: 'name',
    },
    
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} alt="item" style={{ width: 60, height: 60 }} />,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `₹ ${text}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text) => `₹ ${text}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
         <DeleteOutlined   className=' delIcon' onClick={() => handleRemoveFromCart(record)}>
          Remove
        </DeleteOutlined>
        <PlusSquareOutlined  className=' delIcon' onClick={() => handleAddToCart(record)}/>
        </>
       
      ),
    },
  ];

  return (
    <AppLayout>
      <div>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <Table dataSource={cartItems} columns={columns} rowKey="_id" />
        )}
      </div>
    </AppLayout>
  );
};

export default Cart;
