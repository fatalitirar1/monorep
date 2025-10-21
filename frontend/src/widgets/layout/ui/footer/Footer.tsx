'use client';

import { Layout, Space, Typography } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

export const Footer = () => {
  return (
    <AntFooter
      style={{
        textAlign: 'center',
        background: '#f0f2f5',
        padding: '16px 50px',
      }}
    >
      <Space direction='vertical' size='small'>
        <Text type='secondary'>Team 0x01 © {new Date().getFullYear()}</Text>
        <Text type='secondary' style={{ fontSize: '12px' }}>
          Version 1.0.0
        </Text>
      </Space>
    </AntFooter>
  );
};
