'use client';

import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/shared/store/ui-store';

const { Sider } = Layout;

export const Sidebar = () => {
  const router = useRouter();
  const { sidebarCollapsed, theme } = useUIStore();

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
      label: 'Товары',
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
      collapsed={sidebarCollapsed}
      collapsedWidth={0}
      style={{
        background: theme === 'dark' ? '#141414' : '#fff',
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
      breakpoint='lg'
    >
      <div
        style={{
          padding: '16px',
          textAlign: 'center',
          borderBottom:
            theme === 'dark' ? '1px solid #303030' : '1px solid #f0f0f0',
        }}
      >
        <h2
          style={{
            color: theme === 'dark' ? '#fff' : '#1890ff',
            margin: 0,
            opacity: sidebarCollapsed ? 0 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          Логотип
        </h2>
      </div>

      <Menu
        mode='inline'
        defaultSelectedKeys={['/']}
        items={menuItems}
        onClick={handleMenuClick}
        style={{
          borderRight: 0,
          background: 'transparent',
        }}
        theme={theme}
      />
    </Sider>
  );
};
