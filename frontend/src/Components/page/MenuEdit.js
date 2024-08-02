import React, { useEffect, useState } from 'react';
import AppLayout from '../layout/appLayout';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { showLoading, setNotLoading } from '../Redux/cartSlice.js';
import { Table, Modal, Input, Form ,Select} from 'antd';
const { Option } = Select; 
const MenuEdit = () => {
    const [items, setItems] = useState([]);
    const [addItemVisible, setAddItemVisible] = useState(false);

    const [msg, setMsg] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [newItem, setNewItem] = useState({
        name: '',
        price: '',
        category: '',
        image: null,
    });


    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        const getAllItems = async () => {
            try {
                dispatch(showLoading()); 
                const response = await axios.get('/api/v1/item/allItems');
                console.log('Response data:', response.data);
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                dispatch(setNotLoading());
            }
        };
        getAllItems();
    }, [dispatch]);

    const handleAddItem = async () => {
        const formData = new FormData();
        formData.append('name', newItem.name);
        formData.append('price', newItem.price);
        formData.append('category', newItem.category);
        if (newItem.image) {
            formData.append('image', newItem.image);
        }
    
        try {
            const response = await axios.post('/api/v1/item/Add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMsg(response.data.message);
            setItems((prevItems) => [...prevItems, response.data.item]);
            setAddItemVisible(false);
            setNewItem({ name: '', price: '', category: '', image: null }); // Reset new item state
        } catch (error) {
            setMsg('Error adding item.');
            console.error(error);
        }
    };
    

   

    const handleEdit = async (item) => {
        setCurrentItem(item);
        form.setFieldsValue({ price: item.price, category: item.category });
        setIsModalVisible(true);
    };
    const handleSubEdit = async () => {
        const values = await form.validateFields();
        const { price, category } = values;
    
        try {
           
            const response = await axios.put(`/api/v1/item/update/${currentItem.name}`, { price, category });
            setMsg(response.data.message);
            setItems((prevItems) =>
                prevItems.map((item) => (item.name === currentItem.name ? response.data.item : item))
            );
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            setMsg('Error updating item.');
            console.error(error);
        }
    };
    

    const handleCancelEdit = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleDelete = async (itemName) => {
        try {
            await axios.delete(`/api/v1/item/delete/${itemName}`);
            setMsg('Item deleted successfully.');
            setItems((prevItems) => prevItems.filter(item => item.name !== itemName));
        } catch (error) {
            setMsg('Item not found or there was an error fetching the item.');
            console.error(error);
        }
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
            render: (image) => image ? <img src={image} alt="item" style={{ width: 60, height: 60 }} /> : null,
        },
        
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `₹ ${text}`,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (text) => `${text}`,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <EditOutlined onClick={() => handleEdit(record)} />
                    <DeleteOutlined onClick={() => handleDelete(record.name)} />
                </>
            ),
        },
    ];

    return (
        <>
            <AppLayout>
                <div>
                    <div>
                    <h1>Menu</h1>
                    <button onClick={() => setAddItemVisible(true)}>Add menu item</button>

                    </div>
                    <Table dataSource={items} columns={columns} rowKey="_id" />
                </div>
                
                <Modal
    title="Add Menu Item"
    visible={addItemVisible}
    onOk={handleAddItem}
    onCancel={() => setAddItemVisible(false)}
>
    <Form layout="vertical">
        <Form.Item
            label="Name"
            required
        >
            <Input
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
        </Form.Item>
        <Form.Item
            label="Image"
            required
        >
            <input type="file" accept="image/*" onChange={(e) => setNewItem({ ...newItem, image: e.target.files[0] })} />
        </Form.Item>
        <Form.Item
            label="Category"
            required
        >
            <Select
                placeholder="Select a category"
                onChange={(value) => setNewItem({ ...newItem, category: value })}
            >
                <Option value="MainCourse">Main Course</Option>
                <Option value="Starter">Starter</Option>
                <Option value="Plate Cleanser">Plate Cleanser</Option>
                <Option value="Alcohol">Alcohol</Option>
                <Option value="Beverage">Beverage</Option>
                <Option value="Snack">Snack</Option>
            </Select>
        </Form.Item>
        <Form.Item
            label="Price"
            required
        >
            <Input
                type="number"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            />
        </Form.Item>
    </Form>
</Modal>

                <Modal
                    title="Edit Item"
                    visible={isModalVisible}
                    onOk={handleSubEdit}
                    onCancel={handleCancelEdit}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[{ required: true, message: 'Please enter the price!' }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item
                            name="category"
                            label="Category"
                            rules={[{ required: true, message: 'Please enter the category!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </AppLayout>
        </>
    );
}

export default MenuEdit;
