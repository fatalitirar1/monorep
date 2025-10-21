
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';


export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  const login = async (email: string, password: string, remember?: boolean) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Заменить на реальный API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Имитация успешного логина или ошибки
      if (email === 'demo@example.com' && password === 'password') {
        console.log('Login successful', { email, remember });
        router.push('/');
        router.refresh();
        // Здесь будет логика сохранения токена и т.д.
      } else {
        throw new Error('Неверный email или пароль');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка при входе';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
};
