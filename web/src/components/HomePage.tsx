import React from "react";
import { Layout, Menu } from "antd";
import { EnvironmentOutlined, UserOutlined } from "@ant-design/icons";

import { Logo } from "./Logo";
import { LocationTable } from "./LocationTable";

const { Content, Footer, Sider } = Layout;

export const HomePage: React.FC = () => (
  <Layout style={{ height: "100%" }}>
    <Sider breakpoint="lg">
      <Logo />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<EnvironmentOutlined />}>
          Locations
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          Cases
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Content style={{ margin: "24px 16px 0" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <LocationTable />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Made with ♥️</Footer>
    </Layout>
  </Layout>
);
