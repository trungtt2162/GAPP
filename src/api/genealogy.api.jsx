import { API } from ".";

export const genealogyApi = {
  getListUserFromGenealogy: (id) => {
    return API.post("/api/UserGenealogy/paging",{
        PageSize: -1,
        PageNumber: -1,
        Condition: `IdGenealogy=${id}`,
        SortOrder: "",
        SearchKey: ""
      });
  },
  createAdmin: (data) => {
    return API.post("/api/SuperAdmin/admin", data);
  },
  updateAdmin: (data) => {
    return API.put("/api/SuperAdmin/admin", data);
  },
  deleteAdmin: (id) => {
    return API.delete("/api/SuperAdmin/admin?id="+id);
  },
};
