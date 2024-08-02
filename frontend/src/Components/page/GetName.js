import React, { useState } from 'react';
import axios from 'axios';
import AppLayout from '../layout/appLayout.js';

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

    return (
        <AppLayout>
            <div>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Item Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        required 
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Get Item'}
                    </button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {item && (
                    <div>
                        <h3>{item.name}</h3>
                        <p>Price: ₹ {item.price}</p>
                        <p>Category: {item.category}</p>
                        {item.image && <img src={item.image} alt={item.name} />}
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default GetItemByName;
