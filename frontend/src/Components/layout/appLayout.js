import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Layout, Menu, Spin } from "antd"; // Import Spin from antd
import { Link, useNavigate } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined, 
  UserOutlined,
  SearchOutlined,
  LoginOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  ShoppingCartOutlined,
  BookOutlined
} from "@ant-design/icons";
import '../css/appLayout.css';

const { Header, Sider, Content } = Layout;

const AppLayout = ({ children }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const loading = useSelector((state) => state.cart.loading);
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h1 className={`text-center text-light font-weight-bold mt-4 `}>
            {collapsed ? 'RC' : 'RedCaf'}
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/cart" icon={<ShoppingCartOutlined />}>
            <Link to="/cart">Cart</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link to="/bills">Bills</Link>
          </Menu.Item>
          <Menu.Item key="/menuEdit" icon={<BookOutlined />}>
            <Link to="/menuEdit">Menu</Link>
          </Menu.Item>
          <Menu.Item key="/Item" icon={<SearchOutlined />}> 
            <Link to="/Item">Search</Link>
          </Menu.Item>
          {/* <Menu.Item key="/customers" icon={<UserOutlined />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item> */}
          <Menu.Item key="/SignUP" icon={<LoginOutlined />}>
          <Link to="/SignUP">SignUP</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: "0px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,  
            }
          )}
          <div className="cart-item" onClick={() => navigate('/cart')}>
            <p style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
              {cartItems.length}
              <span>
                <ShoppingCartOutlined style={{ marginLeft: '8px', fontSize: '24px', cursor: 'pointer' }} />
              </span>
            </p>
          </div>
        </Header>

        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {loading ? ( 
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Spin size="large" />
            </div>
          ) : (
            children 
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
