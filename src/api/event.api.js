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

  getListEventPening: (id,query) => {
    return API.post("/api/Event/paging", {
      PageSize: 1,
      PageNumber: -1,
      Condition: `IdGenealogy=${id} and Inactive=true `+ (query ? query : ""),
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
    return API.post("api/Event/guest/paging", {
      PageSize: 1,
      PageNumber: -1,
      Condition: `IdGenealogy=${id} and Inactive=false and IsPublic=true` + (query || ""),
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
  addListNewUserEvent: (data) => {
    return API.post("/api/Event/users-event", data);
  },
  deleteUserEvent: (id, idGene) => {
    return API.delete(`/api/Event/user-event?id=${id}&idGenealogy=${idGene}`);
  },
  getListUserAttendEvent: (idGene, IdEvent) => {
    return API.post("/api/Event/user-event/paging", {
      PageSize: 0,
      PageNumber: -1,
      Condition:`idGenealogy = ${idGene} and idEvent = ${IdEvent}`,
      SortOrder: "",
      SearchKey: "",
    });
  },
};
