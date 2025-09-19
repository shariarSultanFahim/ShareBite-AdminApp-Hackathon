"use client";

import React, { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppstoreOutlined,
  BankOutlined,
  GiftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { signOut } from "next-auth/react";

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();

  const signout = async () => {
    await signOut();
  };

  return (
    <Layout className="!min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <AppstoreOutlined />,
              label: "Dashboard",
              onClick: () => router.push("/dashboard"),
            },
            {
              key: "2",
              icon: <GiftOutlined />,
              label: "Drop Requests",
              onClick: () => router.push("/dashboard/drop-requests"),
            },
            {
              key: "3",
              icon: <BankOutlined />,
              label: "Hub",
              onClick: () => router.push("/dashboard/hub"),
            },
            {
              key: "4",
              icon: <TeamOutlined />,
              label: "Employees",
              onClick: () => router.push("/dashboard/employee"),
            },
            {
              key: "5",
              icon: <UserOutlined />,
              label: "Logout",
              onClick: signout,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
