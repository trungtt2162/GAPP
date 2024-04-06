import { API } from ".";

export const eventApi = {
  addAdress: (data) => {
    return API.post("/api/FamilyAddress", data);
  },
  updateAdress: (data) => {
    return API.put("/api/FamilyAddress", data);
  },
  
  
  getListEventAdmin: (id) => {
    return API.post("/api/Event/paging", {
        "PageSize": 1,
        "PageNumber": -1,
        "Condition": `IdGenealogy=${id}`,
        "SortOrder": "",
        "SearchKey": ""
    });
  },
  getListEventGuest: (id) => {
    return API.post("api/Event/guest/paging?idGenealogy="+id, {
        "PageSize": 1,
        "PageNumber": -1,
        "Condition": `IdGenealogy=${id}`,
        "SortOrder": "",
        "SearchKey": ""
    });
  },
  addEvent:(data)=>{
    return API.post("/api/Event",data);
  },
  updateEvent:(data)=>{
    return API.put("/api/Event",data);
  },
  deleteEvent: (id,idGenealogy) => {
    return API.delete(`/api/Event?id=${id}&idGenealogy=${idGenealogy}`);
  },
};
