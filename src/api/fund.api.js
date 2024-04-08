import { API } from ".";

export const fundApi = {
  getFundDetail: () => {
    return API.get("/api/Fund");
  },

  // POST /api/Fund
  addFund: (data) => {
    return API.post("/api/Fund", data);
  },

  // DELETE /api/Fund
  deleteFund: (id) => {
    return API.delete(`/api/Fund?id=${id}`);
  },

  // PUT /api/Fund
  updateFund: (id, data) => {
    return API.put(`/api/Fund?id=${id}`, data);
  },

  // POST /api/Fund/paging
  getlistFund: (id) => {
    return API.post("/api/Fund/paging", {
      PageSize: 0,
      PageNumber: -1,
      Condition: "IdGenealogy="+id,
      SortOrder: "",
      SearchKey: "",
    });
  },
  // GET /api/Fund/contributor
  getContributors: () => {
    return API.get("/api/Fund/contributor");
  },

  // POST /api/Fund/contributor
  addContributor: (data) => {
    return API.post("/api/Fund/contributor", data);
  },

  // DELETE /api/Fund/contributor
  deleteContributor: (id) => {
    return API.delete(`/api/Fund/contributor?id=${id}`);
  },

  // PUT /api/Fund/contributor
  updateContributor: (id, data) => {
    return API.put(`/api/Fund/contributor?id=${id}`, data);
  },

  // POST /api/Fund/contributor/paging
  getContributorsPaging: (pageNumber, pageSize) => {
    return API.post("/api/Fund/contributor/paging", { pageNumber, pageSize });
  },

  // GET /api/Fund/send
  getFundSends: () => {
    return API.get("/api/Fund/send");
  },

  // POST /api/Fund/send
  sendFund: (data) => {
    return API.post("/api/Fund/send", data);
  },

  // DELETE /api/Fund/send
  deleteFundSend: (id) => {
    return API.delete(`/api/Fund/send?id=${id}`);
  },

  // PUT /api/Fund/send
  updateFundSend: (id, data) => {
    return API.put(`/api/Fund/send?id=${id}`, data);
  },

  // POST /api/Fund/send/paging
  getFundSendsPaging: (pageNumber, pageSize) => {
    return API.post("/api/Fund/send/paging", { pageNumber, pageSize });
  },
};
