import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetAll = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/item/All');
                setItems(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchItems();
    }, []);

    return (
        <div>
            <h2>get  Item by name</h2>
            {items.map(item => (
                <div key={item._id}>
                    <h3>{item.name}</h3>
                    <p>Price: {item.price}</p>
                    <p>Category: {item.category}</p>
                    {item.image && <img src={item.image} alt={item.name} />}
                </div>
            ))}
        </div>
    );
};

export default GetAll;
