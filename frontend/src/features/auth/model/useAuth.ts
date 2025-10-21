'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/store/auth-store';
import { useUIStore } from '@/shared/store/ui-store';

interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

const authAPI = {
  login: async (credentials: LoginCredentials) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (
      credentials.email === 'demo@example.com' &&
      credentials.password === 'password'
    ) {
      return {
        id: '1',
        email: credentials.email,
        name: 'Демо Пользователь',
        role: 'admin',
        avatar: '/avatars/demo.jpg',
      };
    }
    throw new Error('Неверный email или пароль');
  },

  logout: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
  },

  getCurrentUser: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));

    const userData = localStorage.getItem('auth-storage');
    if (userData) {
      const parsed = JSON.parse(userData);
      return parsed.state.user || null;
    }
    return null;
  },
};

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    user,
    isAuthenticated,
    login: zustandLogin,
    logout: zustandLogout,
    setLoading,
    setError,
  } = useAuthStore();
  const { addNotification } = useUIStore();

  const { isLoading: isLoadingUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authAPI.getCurrentUser,
    staleTime: 5 * 60 * 1000,
    enabled: !isAuthenticated,
  });

  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (user, variables) => {
      zustandLogin(user, variables.remember);
      addNotification({
        type: 'success',
        title: 'Вход выполнен',
        message: `Добро пожаловать, ${user.name}!`,
      });
      router.push('/');
      router.refresh();
    },
    onError: (error: Error) => {
      setError(error.message);
      addNotification({
        type: 'error',
        title: 'Ошибка входа',
        message: error.message,
      });
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authAPI.logout,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      zustandLogout();
      queryClient.clear();
      addNotification({
        type: 'info',
        title: 'Выход выполнен',
        message: 'Вы успешно вышли из системы',
      });
      router.push('/login');
      router.refresh();
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        title: 'Ошибка выхода',
        message: error.message,
      });
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const login = async (email: string, password: string, remember?: boolean) => {
    return loginMutation.mutateAsync({ email, password, remember });
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  return {
    currentUser: user,
    isAuthenticated,

    login,
    logout,
    loginLoading: loginMutation.isPending,
    logoutLoading: logoutMutation.isPending,
    loginError: loginMutation.error,

    isLoading: isLoadingUser || useAuthStore.getState().isLoading,

    updateUser: useAuthStore.getState().updateUser,
  };
};
