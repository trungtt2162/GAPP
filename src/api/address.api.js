import { API } from ".";

export const addressApi = {
  addAdress: (data) => {
    return API.post("/api/FamilyAddress", data);
  },
  updateAdress: (data) => {
    return API.put("/api/FamilyAddress", data);
  },
  deleteAddress: (id,idGenealogy) => {
    return API.delete(`/api/FamilyAddress?id=${id}&idGenealogy=${idGenealogy}`);
  },
  
  getListAddress: (id,txt="") => {
    return API.post("/api/FamilyAddress/paging", {
        "PageSize": 1,
        "PageNumber": -1,
        "Condition": `IdGenealogy=${id} and Name like '%${txt}%'`,
        "SortOrder": "",
        "SearchKey": ""
    });
  },
};
