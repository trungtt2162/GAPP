import { API } from ".";

export const familyTreeApi = {
  getListFamilyTree: (id) => {
    return API.get("/api/FamilyTree?idGenealogy=" +id);
  },
 addTree:(data)=>{
  return API.post("/api/FamilyTree",data);
 }
};
