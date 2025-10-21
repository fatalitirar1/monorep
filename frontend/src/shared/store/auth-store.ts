import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (user: User, remember?: boolean) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: (user, remember = false) => {
        set({
          user,
          isAuthenticated: true,
          error: null,
          isLoading: false,
        });

        if (remember) {
          localStorage.setItem('user_remember', 'true');
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
        });

        localStorage.removeItem('user_remember');
        sessionStorage.clear();
      },

      setLoading: loading => set({ isLoading: loading }),
      setError: error => set({ error }),

      updateUser: updatedUser => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...updatedUser },
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
