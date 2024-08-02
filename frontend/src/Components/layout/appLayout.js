import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  SearchOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import '../css/appLayout.css'
const { Header, Sider, Content } = Layout;

const  AppLayout =({children})=>{
  const [collapsed,setCollapsed] = useState(false)
  const toggle = () => {
    setCollapsed(!collapsed);
  };

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
          <h1 className={`text-center text-light font-weight-bold mt-4`}>
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
            <Menu.Item key="/bills" icon={<CopyOutlined />}>
              <Link to="/bills">Bills</Link>
            </Menu.Item>
           
            <Menu.Item key="/Item" icon={<SearchOutlined />}>
              <Link to="/Item">Search</Link>
            </Menu.Item>
            <Menu.Item key="/customers" icon={<UserOutlined />}>
              <Link to="/customers">Cutomers</Link>
            </Menu.Item>
            <Menu.Item key="/logout" icon={<LogoutOutlined />}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
}

export default AppLayout;