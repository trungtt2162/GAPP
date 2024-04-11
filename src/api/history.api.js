import { API } from ".";

export const historyApi = {
  getListAllHistoryByGenealogyId: (id,query) => {
    return API.post("/api/FamilyHistory/detail/paging", {
      PageSize: -1,
      PageNumber: -1,
      Condition: `IdGenealogy=${id}`+(query?query:""),
      SortOrder: "",
      SearchKey: "",
    });
  },
  addHistory: (data) => {
    return API.post("/api/FamilyHistory/detail", data);
  },
  updateHistory: (data) => {
    return API.put("/api/FamilyHistory/detail", data);
  },
  deleteHistory: (id, idGenealogy) => {
    return API.delete(
      "/api/FamilyHistory/detail?id=" + id + "&idGenealogy=" + idGenealogy
    );
  },
  getDescriptionHistorufamily: (id) => {
    return API.get("/api/FamilyHistory?idGenealogy=" + id);
  },
  updateDescriptionHistorufamily: (data) => {
    return API.put("/api/FamilyHistory", data);
  },
  getDescriptionHistoryGuest: (id) => {
    return API.get("/api/FamilyHistory/guest?idGenealogy=" + id);
  },
  getListHistoryGuest: (id,query) => {
    return API.post("/api/FamilyHistory/detail/guest/paging?idGenealogy=" + id, {
      PageSize: 0,
      PageNumber: -1,
      Condition: "IDGenealogy ="+id + (query || ""),
      SortOrder: "",
      SearchKey: "",
    });
  },
};
