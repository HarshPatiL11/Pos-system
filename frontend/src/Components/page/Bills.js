import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import AppLayout from '../layout/appLayout.js';
import { useNavigate } from 'react-router-dom';
import { PrinterOutlined } from "@ant-design/icons";
import '../css/bills.css';
import axios from 'axios';

const Bills = () => {
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get('/api/v1/bill/getAllBills');
        setBills(response.data.bills);
      } catch (error) {
        console.error('Error fetching bills:', error);
      }
    };

    fetchBills();
  }, []);

  const handlePrint = (record) => {
    navigate(`/print/${record.billID}`);
    // navigate('/print', { state: { billID: record._id } });
  };

  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Customer Phone',
      dataIndex: 'customerPhone',
      key: 'customerPhone',
    },
    {
      title: 'Payment Mode',
      dataIndex: 'paymentMode',
      key: 'paymentMode',
    },
    {
      title: 'Sub Total',
      dataIndex: 'subTotal',
      key: 'subTotal',
      render: (text) => `₹ ${text}`,
    },
    {
      title: 'Tax',
      dataIndex: 'tax',
      key: 'tax',
      render: (text) => `₹ ${text}`,
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text) => `₹ ${text}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <PrinterOutlined onClick={() => handlePrint(record)} />
      ),
    },
  ];

  return (
    <AppLayout>
      <div className="billContainer">
        <h2>Bills</h2>
        {bills.length === 0 ? (
          <p>No bills to show.</p>
        ) : (
          <Table dataSource={bills} columns={columns} rowKey="_id" />
        )}
      </div>
    </AppLayout>
  );
};

export default Bills;
