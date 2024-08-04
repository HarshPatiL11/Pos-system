import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import { removeFromCart, addToCart,clearCart } from '../Redux/cartSlice';
import AppLayout from '../layout/appLayout.js';
import { DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons";
import '../css/Cart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const Cart = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [billPopUp, setBillPopUp] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <DeleteOutlined className='delIcon' onClick={() => handleRemoveFromCart(record)} />
          <PlusSquareOutlined className='addIcon' onClick={() => handleAddToCart(record)} />
        </>
      ),
    },
  ];

  useEffect(() => {
    let temp = 0;
    cartItems.forEach(item => temp += item.totalPrice);
    setSubTotal(temp);
  }, [cartItems]);

  const handleSubmit = async (values) => {
    try {
      const items = cartItems.map(item => ({
        itemName: item.name,
        itemQuantity: item.quantity,
        itemPrice: item.price,
      }));
      const newObject = {
        ...values,
        items,
        subTotal,
        tax: (Number(subTotal / 100) * 18),
        totalAmount: Number(subTotal + (subTotal / 100) * 18),
      };

      const response = await axios.post("/api/v1/bill/addBill", newObject);
      message.success(response.data.message);
      dispatch(clearCart(cartItems));
      navigate('/bills');
    } catch (error) {
      message.error("Something went wrong: " + (error.response?.data?.message || error.message));
      console.error("Error while posting bill:", error);
    }
  };

  return (
    <AppLayout>
      <div className="cartContainer">
        <div>
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <Table dataSource={cartItems} columns={columns} rowKey="_id" />
              <div className="subTotalContainer">
                <hr />
                <h3>SUB TOTAL: <b>₹ {subTotal.toFixed(2)}/-</b></h3>
                <Button type="primary" onClick={() => setBillPopUp(true)}>Generate Invoice</Button>
              </div>
              <Modal visible={billPopUp} onCancel={() => setBillPopUp(false)} footer={false} title="Invoice">
                <hr />
                <Form layout="vertical" onFinish={handleSubmit}>
                  <Form.Item
                    name="customerName"
                    label="Customer Name"
                    required
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="customerPhone"
                    label="Customer Phone"
                    required
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="paymentMode" label="Payment Mode" required>
                    <Select placeholder="Select a Payment Mode">
                      <Option value="Cash">Cash</Option>
                      <Option value="Card">Card</Option>
                      <Option value="UPI">UPI</Option>
                    </Select>
                  </Form.Item>
                  <div className="billDisplay align-item-end d-flex flex-column">
                    <h4>Sub Total: <b>₹ {subTotal.toFixed(2)}/-</b></h4>
                    <h5>Tax: <b>₹ {((subTotal / 100) * 18).toFixed(2)}/-</b></h5>
                    <hr className='hr2' />
                    <h3>Grand Total: <b>₹ {(subTotal + (subTotal / 100) * 18).toFixed(2)}/-</b></h3>
                    <div className="d-flex justify-content-end">
                      <Button type='primary' htmlType='submit'>Generate Bill</Button>
                    </div>
                  </div>
                </Form>
              </Modal>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Cart;
