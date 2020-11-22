import React from "react";
import { Layout, Menu } from "antd";
import { EnvironmentOutlined, UserOutlined } from "@ant-design/icons";

import { Logo } from "./Logo";
import { Link, useLocation } from "react-router-dom";

const { Content, Footer, Header } = Layout;

interface HomePageProps {
  children: React.ReactNode;
}

export const HomePage: React.FC<HomePageProps> = ({ children }) => {
  const location = useLocation();
  const activeNav = location.pathname.split("/")[1] || "cases";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Menu theme="dark" mode="horizontal" selectedKeys={[activeNav]}>
          <Menu.Item key="0">
            <Logo />
          </Menu.Item>
          <Menu.Item key="cases" icon={<UserOutlined />}>
            <Link to="/">Cases</Link>
          </Menu.Item>
          <Menu.Item key="locations" icon={<EnvironmentOutlined />}>
            <Link to="/locations">Locations</Link>
          </Menu.Item>
          <Menu.Item key="patients" icon={<UserOutlined />}>
            <Link to="/patients">Patients</Link>
          </Menu.Item>
          <Menu.Item key="settings" icon={<UserOutlined />}>
            <Link to="/settings">Settings</Link>
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
};
