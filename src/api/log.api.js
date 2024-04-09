import { API } from ".";

export const logApi = {
  getListLogBygenealogy: (id) => {
    return API.post("/api/User/log", {
      PageSize: 1,
      PageNumber: -1,
      Condition: `IdGenealogy=${id}`,
      SortOrder: "",
      SearchKey: "",
    });
  },
  getListAllLog: (id) => {
    return API.post("/api/User/log", {
      PageSize: 1,
      PageNumber: -1,
      Condition: "",
      SortOrder: "",
      SearchKey: "",
    });
  },
  
};
