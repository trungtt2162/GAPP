import { API } from ".";

export const feedbackApi = {
  getListFeedBackByGeneAndFund: (idgene, idFund) => {
    return API.post("/api/FeedBack/paging", {
      PageSize: 0,
      PageNumber: -1,
      Condition: `IdGenealogy=${idgene} and IdInstance=${idFund}`,
      SortOrder: "",
      SearchKey: "",
    });
  },
  createFeedback: (data) => {
    return API.post("/api/FeedBack",data);
  },
  updateFeedBack: (data) => {
    return API.put("/api/FeedBack", data);
  },
  deleteFeedBack: (id, idGenealogy) => {
    return API.delete(`/api/FeedBack?id=${id}&idGenealogy=${idGenealogy}`);
  },
};
