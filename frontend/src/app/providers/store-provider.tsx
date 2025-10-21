'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/shared/store/ui-store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useUIStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.style.background = theme === 'dark' ? '#000' : '#fff';
  }, [theme]);

  return <>{children}</>;
}
