import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import useFetchData from "../customHook/useFetchData";
import { API } from "../api";
import { authApi } from "../api/auth.api";
import { LOCAL_STORAGE_KEY, USER_ROLE } from "../constant/common";
import { logout } from "../ultils/helper";
const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      error: null,
      isLogin: false,
      roleCode: null,
      roleName: null,
      userGenealogy: [],
      currentIdGenealogy: null,
      geneName: "",
      listRole: [],
      isCreateGene: false,
      listNoti: [],
      setUser: (user) => {
        set({
          user,
        });
      },
      logOutAction: (flag = true) => {
        logout(flag);
        set({
          user: null,
          roleCode: null,
          roleName: null,
          userGenealogy: [],
          currentIdGenealogy: null,
          isLogin: false,
          listRole: [],
          isCreateGene: "",
          geneName: "",
        });
      },
      setListNoti: (list = []) => {
        set({
          listNoti: list,
        });
      },

      selectGeneAction: (currentId, currentRole) => {
        const list = useAuthStore.getState().listRole;
        const current = list.find((i) => i.IdGenealogy == currentId);
        set({
          currentIdGenealogy: currentId,
          roleCode: current?.RoleCode,
          geneName: current?.GenealogyName,
        });
      },
      setGeneName: (name) => {
        const list = useAuthStore.getState().listRole;
        set({
          geneName: name,
        });
      },
      login: async ({ userName, password }) => {
        set({ isLoading: true, error: null });
        try {
          let currRole, currentId;
          const res = await authApi.login({
            userName,
            password,
          });
          const data = res.data.Data;
          if (res.data.StatusCode === 200) {
            localStorage.setItem(LOCAL_STORAGE_KEY.token, data.accessToken);
            await useAuthStore.getState().getInfoUser();
          } else {
            throw new Error("Đăng nhập thất bại");
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      getInfoUser: async () => {
        try {
          let currRole, currentId;
          const infoRes = await authApi.getInfoUser();
          const currentUser = infoRes.data.Data.User;
          const giapha = infoRes.data.Data.UserGenealogy;
          let geneName = "";
          let haveAdmin = false;
          let listRole =
            infoRes.data.Data?.UserRole?.filter((i) => i.IdGenealogy != -1) ||
            [];
          // if(listRole.length === 0){
          //   currRole = USER_ROLE.User;
          //   currentId = -1;
          // }
          if (
            giapha.length === 0 &&
            !listRole.find((i) => i.RoleCode === USER_ROLE.SupperAdmin)
          ) {
            currRole = USER_ROLE.User;
            currentId = -1;
          } else {
            currentId = giapha?.length > 0 ? giapha[0].IdGenealogy : -1;
            const isSupper = listRole.find(
              (i) => i.RoleCode === USER_ROLE.SupperAdmin
            );
            if (isSupper) {
              currRole = USER_ROLE.SupperAdmin;
            } else {
              // get curet role
              const item = listRole
                ?.reverse()
                .find((i) => i.IdGenealogy === currentId);
              if (item) {
                currRole = item.RoleCode;
                geneName = item.GenealogyName;
              }
            }
          }

          // listRole = listRole.map(item => {
          //   const id = item.IdGenealogy;
          //   const current = giapha.find(i => i.Id ==id );
          //   if(current){
          //      item.GeneName = current.Name
          //   }
          //   return item;
          // })
          const isHaveAdmin = listRole.find(
            (i) => i.RoleCode == USER_ROLE.SiteAdmin
          );

          set({
            user: currentUser,
            userGenealogy: giapha,
            currentIdGenealogy: currentId,
            isLogin: true,
            roleCode: currRole,
            listRole: listRole,
            isCreateGene: !isHaveAdmin,
            geneName,
          });
        } catch (error) {}
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
