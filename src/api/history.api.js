import { API } from ".";

export const historyApi = {
  getListAllHistoryByGenealogyId: (id) => {
    return API.post("/api/FamilyHistory/detail/paging",{
        PageSize: -1,
        PageNumber: -1,
        Condition: `IdGenealogy=${id}`,
        SortOrder: "",
        SearchKey: ""
      });
  },
  addHistory: (data) => {
    return API.post("/api/FamilyHistory/detail", data);
  },
  updateHistory: (data) => {
    return API.put("/api/FamilyHistory/detail", data);
  },
  deleteHistory: (id,idGenealogy) => {
    return API.delete("/api/FamilyHistory/detail?id="+id + "&idGenealogy="+idGenealogy);
  },
  getDescriptionHistorufamily:(id) => {
    return API.get("/api/FamilyHistory?idGenealogy="+id)
  },
  updateDescriptionHistorufamily:(data) => {
    return API.put("/api/FamilyHistory",data)
  },
};
