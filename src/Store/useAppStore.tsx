import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AppState {
  theme: 'light' | 'dark';
  isNavbarCollapsed: boolean | null;
  showSideBarOnMobile: boolean;
  toggleShowSideBarOnMobile: () => void;
  toggleTheme: () => void;
  toggleNavbar: () => void;
  setInitialTheme: () => void;
  totalFilesUploaded?: number;
  setTotalFilesUploaded?: (count: number) => void;
  setModalOpen?: (isOpen: boolean) => void;
  isModalOpen: boolean;
}

const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      isNavbarCollapsed: null,
      showSideBarOnMobile: false,
      totalFilesUploaded: 0,
      isModalOpen: false,
      setTotalFilesUploaded: (count: number) =>
        set({ totalFilesUploaded: count }),

      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        set({ theme: newTheme });
      },

      toggleNavbar: () =>
        set((state) => ({ isNavbarCollapsed: !state.isNavbarCollapsed })),

      toggleShowSideBarOnMobile: () =>
        set((state) => ({ showSideBarOnMobile: !state.showSideBarOnMobile })),

      setInitialTheme: () => {
        const savedTheme = get().theme;
        document.documentElement.classList.toggle(
          'dark',
          savedTheme === 'dark'
        );
      },

      setModalOpen: (isOpen: boolean) => {
        set({ isModalOpen: isOpen });
      },
    }),
    {
      name: 'app-store', // Key for localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
      //   partialize: (state) => ({
      //     ...state,
      //     hasVisited: false,
      //   }),
    }
  )
);

export default useAppStore;
