import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AntdProvider } from './providers/antd-provider';
import './styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang='en'>
      <body className={inter.className}>
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  );
}
