'use client';

import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Sider } = Layout;

export const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Дашборд',
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: 'Пользователи',
    },
    {
      key: '/products',
      icon: <ShoppingCartOutlined />,
      label: 'Продукты',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Настройки',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
  };

  return (
    <Sider
      width={250}
      style={{
        background: '#fff',
        boxShadow: '2px 0 8px 0 rgba(29, 35, 41, 0.05)',
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <h2 style={{ color: '#1890ff', margin: 0 }}>Logo</h2>
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={['/']}
        items={menuItems}
        onClick={handleMenuClick}
        style={{ borderRight: 0 }}
      />
    </Sider>
  );
};
