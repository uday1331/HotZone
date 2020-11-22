import React from "react";
import { Layout, Menu } from "antd";
import { EnvironmentOutlined, UserOutlined } from "@ant-design/icons";

import { Logo } from "./Logo";
import { Link } from "react-router-dom";

const { Content, Footer, Header } = Layout;

interface HomePageProps {
  children: React.ReactNode;
}

export const HomePage: React.FC<HomePageProps> = ({ children }) => (
  <Layout style={{ minHeight: "100vh" }}>
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="0">
            <Logo />
          </Menu.Item>
          <Menu.Item key="1" icon={<EnvironmentOutlined />}>
            <Link to="/">
              Locations
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/cases">
              Cases
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/patients">
              Patients
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to="/settings">
              Settings
            </Link>
          </Menu.Item>
      </Menu>
    </Header>
    <Layout>
      <Content style={{ margin: "24px 16px 0" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Made with ♥️</Footer>
    </Layout>
  </Layout>
);
