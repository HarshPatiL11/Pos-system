import React, { useState } from 'react';
import axios from 'axios';
import { Input,Card, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import AppLayout from '../layout/appLayout.js';
import '../css/getName.css';

const { Meta } = Card;

const GetItemByName = () => {
    const [name, setName] = useState('');
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const capitalize = (str) => {
        if (!str) return ''; // Handle empty strings
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            const capitalizedName = name
                .split(' ')
                .map(word => capitalize(word))
                .join(' '); // Capitalize each word and join them back with a space
    
            const response = await axios.get(`/api/v1/item/${encodeURIComponent(capitalizedName)}`);
            setItem(response.data);
        } catch (error) {
            setError('Item not found or there was an error fetching the item.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveCart = (item) => {
        // Handle remove from cart logic here
        console.log('Remove from cart:', item);
    };

    const handleAddToCart = (item) => {
        // Handle add to cart logic here
        console.log('Add to cart:', item);
    };

    return (
        <AppLayout>
            <div className="get-item-container">
            <h1>RedCaff Pos</h1>
                <hr/>
                <form onSubmit={handleSubmit} className="get-item-form">
                    <Input 
                        placeholder="Item Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        required 
                        className="get-item-input"
                        suffix={
                            <SearchOutlined onClick={handleSubmit}/>
                        }
                    />
                </form> 
                <hr className='hr2'/>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {item && (
                    <Card
                        hoverable
                        cover={<img alt={item.name} src={item.image} className="card-img-top" />}
                        className="item-card"
                    >
                        <Meta
                            title={item.name}
                            description={`Price: ₹ ${item.price}`}
                        />
                        <div className="card-actions">
                            <Button type="primary" className='rmBtn' onClick={() => handleRemoveCart(item)}>
                                Remove
                            </Button>
                            <Button type="primary" onClick={() => handleAddToCart(item)}>
                                Add to Cart
                            </Button>
                        </div>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
};

export default GetItemByName;
