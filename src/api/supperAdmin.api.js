import { API } from ".";

export const supperAdminApi = {
  getListAdmin: (txt) => {
    return API.post("/api/SuperAdmin/admin/paging",{
        PageSize: -1,
        PageNumber: -1,
        Condition: `Email like '%${txt}%'`,
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
