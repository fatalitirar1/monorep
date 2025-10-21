'use client';

import { Layout, Button, Space, Avatar, Dropdown, Switch, Tooltip } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

import { useUIStore } from '@/shared/store/ui-store';
import { useAuth } from '@/features/auth';

const { Header: AntHeader } = Layout;

export const Header = () => {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme, sidebarCollapsed, toggleSidebar } = useUIStore();

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Профиль',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Настройки',
    },
    {
      type: 'divider',
    },
    {
      key: 'theme',
      label: (
        <Space>
          Тема: {theme === 'light' ? 'Светлая' : 'Темная'}
          <Switch
            size='small'
            checked={theme === 'dark'}
            onChange={toggleTheme}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
        </Space>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Выйти',
      onClick: logout,
    },
  ];

  return (
    <AntHeader
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: theme === 'dark' ? '#141414' : '#fff',
        padding: '0 20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        borderBottom:
          theme === 'dark' ? '1px solid #303030' : '1px solid #f0f0f0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Button
          type='text'
          icon={sidebarCollapsed ? '→' : '←'}
          onClick={toggleSidebar}
          style={{ color: theme === 'dark' ? '#fff' : '#000' }}
        />
        <h1
          style={{
            margin: 0,
            color: theme === 'dark' ? '#fff' : '#1890ff',
            fontSize: '18px',
          }}
        >
          Мое Приложение
        </h1>
      </div>

      <Space>
        <Tooltip
          title={`Переключить на ${theme === 'light' ? 'темную' : 'светлую'} тему`}
        >
          <Switch
            checked={theme === 'dark'}
            onChange={toggleTheme}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
        </Tooltip>

        <Dropdown menu={{ items: userMenuItems }} placement='bottomRight'>
          <Button
            type='text'
            style={{ color: theme === 'dark' ? '#fff' : '#000' }}
          >
            <Space>
              <Avatar size='small' icon={<UserOutlined />} />
              {currentUser?.name || 'Пользователь'}
            </Space>
          </Button>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};
