import React, { useState } from 'react';
import axios from 'axios';
import '../css/AddItem.css';
import AppLayout from '../layout/appLayout.js'
const AddImage = ({ onProductAdded }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        if (image) formData.append('image', image);

        try {
            const response = await axios.post('/api/v1/item/Add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onProductAdded(response.data.product);
            setName('');
            setPrice('');
            setCategory(''); 
            setImage(null);
        } catch (error) {
            console.error('Error creating product:', error.response.data);
        }
    };

    return (
        <AppLayout>
        <form onSubmit={handleSubmit}>
            <h2>Create Product</h2>
            <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            />
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
            />
            <button type="submit">Add Product</button>
        </form>
        </AppLayout>
    );
};

export default AddImage;
