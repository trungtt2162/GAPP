import { API } from ".";

export const authApi = {
  login: (data) => {
    return API.post("api/Account/login", data);
  },
  register: (data) => {
    return API.post("/api/Account/register", data);
  },
  getInfoUser: (data) => {
    return API.get("api/User");
  },
  upadteinfoAdmin: (data) => {
    return API.put("/api/User", data);
  },
  upadteinfoUser: (data) => {
    return API.put("/api/User", data);
  },
  changePass:(data) => {
    return API.post("/api/Account/change-password",data)
  },
  forgotPass:(data) => {
    return API.post("/api/Account/recover-pass",data)
  }
};
