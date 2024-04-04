import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import useFetchData from "../customHook/useFetchData";
import { API } from "../api";
import { authApi } from "../api/auth.api";
import { LOCAL_STORAGE_KEY } from "../constant/common";
const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      error: null,
      isLogin: false,
      roleCode: null,
      roleName: null,
      userGenealogy:[],
      setUser: (user) => {
        set({
          user,
        });
      },
      login: async ({ userName, password }) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authApi.login({
            userName,
            password,
          });
          const data = res.data.Data;
          if (res.data.StatusCode === 200) {
            localStorage.setItem(LOCAL_STORAGE_KEY.token, data.accessToken);
            const infoRes = await authApi.getInfoUser();
            const currentUser = infoRes.data.Data.User;
            const userRole = infoRes.data.Data.UserRole;
            const giapha = infoRes.data.Data.UserGenealogy

            set({
              user: currentUser,
              roleCode: userRole.RoleCode,
              roleName: userRole.RoleName,
              userGenealogy:giapha

            });
          } else {
            throw new Error("Đăng nhập thất bại");
          }
        } catch (error) {
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;

