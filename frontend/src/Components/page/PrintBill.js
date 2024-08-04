import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import '../css/printBill.css';
import AppLayout from '../layout/appLayout';

const PrintBill = () => {
  const { billID } = useParams(); 
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBill = async () => {
      if (!billID) {
        console.error('No billID provided.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/v1/bill/${billID}`);
        setBill(response.data.bill);
      } catch (error) {
        console.error('Error fetching bill:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [billID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!bill) {
    return <div>No bill details available.</div>;
  }

  return (
    <AppLayout>
      <div className="bill-container">
        <div className="header text-center">
          <div className="logo">
            <img src="logo.png" alt="Logo" />
          </div>
        </div>
        <div className="bill-details">
          <div className="customer-info">
            <p><strong>Date:</strong> {new Date(bill.createdAt).toLocaleDateString()}</p>
            <p><strong>Customer Name:</strong> {bill.customerName}</p>
            <p><strong>Customer Phone:</strong> {bill.customerPhone}</p>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {bill.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemName}</td>
                  <td>{item.itemQuantity}</td>
                  <td>₹ {item.itemPrice}</td>
                  <td>₹ {item.itemQuantity * item.itemPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="amount-details">
            <p><strong>Sub Total:</strong> ₹ {bill.subTotal}</p>
            <p><strong>Tax (18%):</strong> ₹ {bill.tax}</p>
            <p><strong>Total Amount:</strong> ₹ {bill.totalAmount}</p>
          </div>
        </div>
        <div className="text-center mt-3">
          <Button type="primary" onClick={() => window.print()}>Print Bill</Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default PrintBill;
