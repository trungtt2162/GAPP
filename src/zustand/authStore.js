import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      emailReset:null,
      login: (userData) => {
        set({ isAuthenticated: true, user: userData });
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
      setUser: (userData) => {
        set({ user: userData });
      },
      setEmailReset: (email) => {
        set({ emailReset: email });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
