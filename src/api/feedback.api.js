import { API } from ".";

export const feedbackApi = {
  getListFeedBackByGeneAndFund: (idgene,idFund) => {
    return API.post("/api/FeedBack/paging", {
      PageSize: 0,
      PageNumber: -1,
      Condition: `IdGenealogy=${idgene} and IdInstance=${idFund}`,
      SortOrder: "",
      SearchKey: "",
    });
  },
  updateAdress: (data) => {
    return API.put("/api/FamilyAddress", data);
  },
  deleteAddress: (id, idGenealogy) => {
    return API.delete(`/api/FamilyAddress?id=${id}&idGenealogy=${idGenealogy}`);
  },

  getListAddress: (id) => {
    return API.post("/api/FamilyAddress/paging", {
      PageSize: 1,
      PageNumber: -1,
      Condition: `IdGenealogy=${id}`,
      SortOrder: "",
      SearchKey: "",
    });
  },
};
