import { API } from ".";

export const logApi = {
  getListLogBygenealogy: (id,txt="") => {
    return API.post("/api/User/log", {
      PageSize: 1,
      PageNumber: -1,
      Condition: `IdGenealogy=${id} and CreatedBy like '%${txt}%'`,
      SortOrder: "",
      SearchKey: "",
    });
  },
  getListAllLog: (id,txt="") => {
    return API.post("/api/User/log", {
      PageSize: 1,
      PageNumber: -1,
      Condition: `CreatedBy like '%${txt}%'`,
      SortOrder: "",
      SearchKey: "",
    });
  },
  
};
