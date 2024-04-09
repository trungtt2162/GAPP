import { API } from ".";

export const genealogyApi = {
  getListUserFromGenealogy: (id) => {
    return API.post("/api/UserGenealogy/paging", {
      PageSize: -1,
      PageNumber: -1,
      Condition: `IdGenealogy=${id} and Inactive=false`,
      SortOrder: "",
      SearchKey: "",
    });
  },
  createAdmin: (data) => {
    return API.post("/api/SuperAdmin/admin", data);
  },
  updateAdmin: (data) => {
    return API.put("/api/SuperAdmin/admin", data);
  },
  deleteAdmin: (id) => {
    return API.delete("/api/SuperAdmin/admin?id=" + id);
  },
  getListGegePublic: (id) => {
    return API.post("/api/Genealogy/guest/paging", {
      PageSize: 0,
      PageNumber: -1,
      Condition: "isPublic = true",
      SortOrder: "",
      SearchKey: "",
    });
  },

  requestgele: (id) => {
    return API.post("/api/User/register?idGenealogy=" + id);
  },
  getListUserRequest: (id) => {
    return API.post("/api/UserGenealogy/paging", {
      PageSize: 0,
      PageNumber: -1,
      Condition: `IdGenealogy = ${id} and Inactive = true`,
      SortOrder: "",
      SearchKey: "",
    });
  },
  approveUser : (data) => {
    return API.post("/api/UserGenealogy/approve",data)
  },
  addNewMember:(data) => {
    return API.post("/api/UserGenealogy/newmember",data)
  }
  ,
  getListUserByEmailAndName: (id,txt) => {
    return API.post("/api/UserGenealogy/paging", {
      PageSize: -1,
      PageNumber: -1,
      Condition: `IdGenealogy=${id} and Inactive=false and ( FirstName LIKE '%${txt}%' OR LastName LIKE '%${txt}%')`,
      SortOrder: "",
      SearchKey: "",
    });
  },
};
