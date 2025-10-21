import type { Metadata } from 'next';
import ReactQueryProvider from '@/app/providers/react-query-provider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import StoreProvider from './providers/store-provider';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'Team 0x01',
  description: 'Team 0x01 for a7 solution',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ru'>
      <body>
        <ReactQueryProvider>
          <StoreProvider>
            <AntdRegistry>{children}</AntdRegistry>
          </StoreProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
