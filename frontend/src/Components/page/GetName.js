import React, { useState } from 'react';
import axios from 'axios';

const GetItemByName = () => {
    const [name, setName] = useState('');
    const [item, setItem] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/item/${name}`);
            setItem(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>get Item by name</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Item Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <button type="submit">Get Item</button>
            </form>
            {item && (
                <div>
                    <h3>{item.name}</h3>
                    <p>Price: {item.price}</p>
                    <p>Category: {item.category}</p>
                    {item.image && <img src={item.image} alt={item.name} />}
                </div>
            )}
        </div>
    );
};

export default GetItemByName;