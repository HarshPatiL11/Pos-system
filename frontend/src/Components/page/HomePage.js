import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, showLoading, setNotLoading } from '../Redux/cartSlice.js';
import AppLayout from '../layout/appLayout.js'; 
import axios from 'axios';
import { Card, Row, Col,Button,Flex,Spin } from 'antd';
import Cart from './cart.js';

const { Meta } = Card;

const HomePage = () => {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart); 
  const loading = cart.loading; 

  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch(showLoading()); 
        const response = await axios.get('/api/v1/item/allItems');

        console.log('Response data:', response.data);
        setItems(response.data);
        dispatch(setNotLoading()); 
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    getAllItems();
  }, []);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };
  const handleRemoveCart = (item) => {
    dispatch(removeFromCart(item));
  };
  return (
    <AppLayout>
      <div className="container mt-4 homeContainer">
      {loading? (<Spin size="large" />):
      (
        <Row gutter={[16, 16]}>
        {items.length === 0 ? (
          <p>No items available.</p>
        ) : (
          items.map(item => (
            <Col xs={24} sm={12} md={8} lg={6} key={item._id}>
              <Card
                hoverable
                cover={<img alt={item.name} src={item.image} className="card-img-top" />}
              >
                <Meta
                  title={item.name}
                  description={`Price: ₹ ${item.price}`}
                />
                <Flex wrap gap="small">
                <Button type="primary" className='rmBtn' onClick={() => handleRemoveCart(item)}>
                  Remove
                </Button>

                    <Button type="primary" onClick={() => handleAddToCart(item)}>
                        Add to Cart
                    </Button>
                </Flex>
                
              </Card>
            </Col>
          ))
        )}
      </Row>
      )
      }

       
      </div>
    </AppLayout>
  );
};

export default HomePage;
