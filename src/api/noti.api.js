import { API } from ".";

export const notiApi = {
  getListNoti: (id, txt = "") => {
    return API.get("/api/User/notification");
  },
};
