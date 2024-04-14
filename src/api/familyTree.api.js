import { API } from ".";

export const familyTreeApi = {
  getListFamilyTree: (id) => {
    return API.get("/api/FamilyTree?idGenealogy=" +id);
  },
 addTree:(data)=>{
  return API.post("/api/FamilyTree",data);
 },
 updateTree:(data)=>{
  return API.put("/api/FamilyTree",data);
 },
 getListAllNode :(id) => {
  return API.get(`/api/FamilyTree?idGenealogy=${id}`)
 },
 deleteTree :(idgene,id) => {
  return API.delete(`/api/FamilyTree?idGenealogy=${idgene}&id=${id}`)
 }
};
