import { API } from ".";

export const genealogyApi = {
  getListUserFromGenealogy: (id, txtSearch = "",query="") => {
    return API.post("/api/UserGenealogy/paging", {
      PageSize: -1,
      PageNumber: -1,
      Condition: `IdGenealogy=${id} and (Inactive=false or Inactive is null) and (LastName like '%${txtSearch}%' or FirstName like '%${txtSearch}%') ${query}`,
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
      Condition: "IsPublic = true",
      SortOrder: "",
      SearchKey: "",
    });
  },
  getListGegePublicByName: (name) => {
    return API.post("/api/Genealogy/guest/paging", {
      PageSize: 0,
      PageNumber: -1,
      Condition: `Name like '%${name}%'`,
      SortOrder: "",
      SearchKey: "",
    });
  },
  getListGegePublicById: (id) => {
    return API.post("/api/Genealogy/guest/paging", {
      PageSize: 0,
      PageNumber: -1,
      Condition: `Id like '%${id}%'`,
      SortOrder: "",
      SearchKey: "",
    });
  },

  requestgele: (id) => {
    return API.post("/api/User/register?idGenealogy=" + id);
  },
  getListUserRequest: (id, txtSearch) => {
    return API.get("/api/UserGenealogy/member-request?idGenealogy=" + id, {
      PageSize: 0,
      PageNumber: -1,
      Condition: `IdGenealogy = ${id} and InActive = true  and (LastName like '%${txtSearch}%' or FirstName like '%${txtSearch}%')`,
      SortOrder: "",
      SearchKey: "",
    });
  },
  approveUser: (data) => {
    return API.post("/api/UserGenealogy/approve", data);
  },
  addNewMember: (data) => {
    return API.post("/api/UserGenealogy/newmember", data);
  },
  getListUserByEmailAndName: (id, txt) => {
    return API.post("/api/UserGenealogy/paging", {
      PageSize: -1,
      PageNumber: -1,
      Condition: `IdGenealogy=${id} and Inactive=false and ( FirstName LIKE '%${txt}%' OR LastName LIKE '%${txt}%')`,
      SortOrder: "",
      SearchKey: "",
    });
  },
  changeRoleUser: (body) => {
    return API.post("/api/User/decentralization", body);
  },
  getCurrentGene: (id) => {
    return API.post("/api/Genealogy/paging", {
      PageSize: 0,
      PageNumber: -1,
      Condition: "Id=" + id,
      SortOrder: "",
      SearchKey: "",
    });
  },
  updateCurrentGene: (data) => {
    return API.put("/api/Genealogy", data);
  },
  createGene: (data) => {
    return API.post("/api/Genealogy", data);
  },
  deleteUserGene: (idgene, iduser) => {
    return API.delete(`/api/UserGenealogy?id=${iduser}&idGenealogy=${idgene}`);
  },
  updateUsergene: (data) => {
    return API.put("/api/UserGenealogy", data);
  },
  exportExcel: (id) => {
    return API.get("/api/FamilyTree/export?idGenealogy=" + id);
  },
  downloadExcel: (fileName) => {
    return API.get("/api/Download?fileName=" + fileName, {
      responseType: "blob",
    });
  },
  exportListMember: (id) => {
    return API.get("/api/UserGenealogy/export?idGenealogy=" + id);
  },
  giveNewAcount: (data) => {
    return API.post("/api/UserGenealogy/account", data);
  },
};
