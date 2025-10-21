import { create } from 'zustand';

interface AppStats {
  totalUsers: number;
  activeUsers: number;
  totalSales: number;
  growth: number;
}

interface AppState {
  stats: AppStats;
  setStats: (stats: Partial<AppStats>) => void;

  filters: {
    dateRange: [Date, Date] | null;
    searchQuery: string;
    category: string;
  };
  setFilters: (filters: Partial<AppState['filters']>) => void;
  resetFilters: () => void;

  modals: {
    userModal: { open: boolean; userId?: string };
    settingsModal: { open: boolean };
  };
  openModal: (modal: keyof AppState['modals'], data?: { userId?: string }) => void;
  closeModal: (modal: keyof AppState['modals']) => void;
}

export const useAppStore = create<AppState>(set => ({
  stats: {
    totalUsers: 0,
    activeUsers: 0,
    totalSales: 0,
    growth: 0,
  },
  setStats: newStats =>
    set(state => ({
      stats: { ...state.stats, ...newStats },
    })),

  filters: {
    dateRange: null,
    searchQuery: '',
    category: 'all',
  },
  setFilters: newFilters =>
    set(state => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () =>
    set({
      filters: {
        dateRange: null,
        searchQuery: '',
        category: 'all',
      },
    }),

  modals: {
    userModal: { open: false },
    settingsModal: { open: false },
  },
  openModal: (modal, data) =>
    set(state => ({
      modals: {
        ...state.modals,
        [modal]: { open: true, ...data },
      },
    })),
  closeModal: modal =>
    set(state => ({
      modals: {
        ...state.modals,
        [modal]: { open: false },
      },
    })),
}));