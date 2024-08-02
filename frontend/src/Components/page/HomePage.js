import React, { useState, useEffect } from 'react';
import AppLayout from '../layout/appLayout.js'; // Ensure the correct path to your AppLayout.
import axios from 'axios';
import { Card, Row, Col } from 'antd';
import '../css/HomePage.css';

const { Meta } = Card;

const HomePage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/v1/item/allItems');
        console.log('Response data:', response.data);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <AppLayout>
      <div className="container mt-4">
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
                </Card>
              </Col>
            ))
          )}
        </Row>
      </div>
    </AppLayout>
  );
};

export default HomePage;
