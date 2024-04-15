import { API } from ".";

export const eventApi = {
  addAdress: (data) => {
    return API.post("/api/FamilyAddress", data);
  },
  updateAdress: (data) => {
    return API.put("/api/FamilyAddress", data);
  },

  getListEventAdmin: (id, query) => {
    return API.post("/api/Event/paging", {
      PageSize: 1,
      PageNumber: -1,
      Condition: `IdGenealogy=${id} and Inactive=false ` + (query ? query : ""),
      SortOrder: "",
      SearchKey: "",
    });
  },

  getListEventPening: (id) => {
    return API.post("/api/Event/paging", {
      PageSize: 1,
      PageNumber: -1,
      Condition: `IdGenealogy=${id} and Inactive=true `,
      SortOrder: "",
      SearchKey: "",
    });
  },

  getListEventByName: (id, name) => {
    return API.post("/api/Event/paging", {
      PageSize: 1,
      PageNumber: -1,
      Condition: `IdGenealogy=${id} and Name like '%${name}%' and Inactive=false`,
      SortOrder: "",
      SearchKey: "",
    });
  },
  getListEventGuest: (id, query) => {
    return API.post("api/Event/guest/paging?idGenealogy=" + id, {
      PageSize: 1,
      PageNumber: -1,
      Condition: `IdGenealogy=${id} and Inactive=false` + (query || ""),
      SortOrder: "",
      SearchKey: "",
    });
  },
  addEvent: (data) => {
    return API.post("/api/Event", data);
  },
  updateEvent: (data) => {
    return API.put("/api/Event", data);
  },
  resquestEvent: (data) => {
    return API.post("/api/Event/request-event", data);
  },

  deleteEvent: (id, idGenealogy) => {
    return API.delete(`/api/Event?id=${id}&idGenealogy=${idGenealogy}`);
  },
  requestEvent: (data) => {
    return API.post("/api/Event/request-event", data);
  },
  adminRequestEvent: (data) => {
    return API.post("/api/Event/admin-request", data);
  },
  sendEmailEvent: (idgene, IdEvent) => {
    return API.get(
      `/api/Event/send-email?idGenealogy=${idgene}&idEvent=${IdEvent}`
    );
  },
};
