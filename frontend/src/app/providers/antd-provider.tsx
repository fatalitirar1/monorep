'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, ThemeConfig } from 'antd';
import { ReactNode } from 'react';

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
  },
};

interface AntdProviderProps {
  children: ReactNode;
}

export const AntdProvider = ({ children }: AntdProviderProps) => {
  return (
    <AntdRegistry>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </AntdRegistry>
  );
};
