import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { handleError } from "../../ultils/helper";
import axios from "axios";
import { toast } from "react-toastify";
import { authApi } from "../../api/auth.api";
import useAuthStore from "../../zustand/authStore";
import { genealogyApi } from "../../api/genealogy.api";
import { familyTreeApi } from "../../api/familyTree.api";
import { USER_ROLE } from "../../constant/common";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
    margin: "auto",
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));

function CurrentPositionGene() {
    const [listMember, setlistMember] = useState([]);
  const classes = useStyles();
  const [id, setId] = useState("");
  const [listGene, setListGene] = useState([]);
  const [listFamilyTree, setListFamilyTree] = useState([]);
  const { currentIdGenealogy,user } = useAuthStore();
  const [dataPost, setDataPost] = useState({
    Id: 0,
    ModifiedBy: "string",
    ModifiedDate: "2024-04-20T03:17:47.980Z",
    CreatedBy: "string",
    CreatedDate: "2024-04-20T03:17:47.980Z",
    FirstName: "string",
    LastName: "string",
    Email: "string",
    Indentification: "string",
    Phone: "string",
    Address: "string",
    Gender: 0,
    DateOfBirth: "2024-04-20T03:17:47.980Z",
    DateOfDeath: "2024-04-20T03:17:47.980Z",
    Avatar: "string",
    Type: 0,
    HomeTown: "string",
    InActive: true,
    IsBlock: true,
    JobTitle: "a",
    IsMartyrs: true,
    IdFamilyTree: 0,
    IdGenealogy: 0,
    UserId: 0,
    TypeRole: 0,
  });

  //
  const siteAdmin = listMember.find(i => i.RoleCode === USER_ROLE.SiteAdmin)
  console.log(user)
  const onReqest = async () => {
    try {
      const res = await genealogyApi.updateUsergene({
        ...dataPost,...user,IdGenealogy:currentIdGenealogy,JobTitle:"",Id:siteAdmin?.Id,UserId:user.Id
      });
      if (res.data.StatusCode === 200) {
        toast.success("Yêu cầu thành công");
      }
    } catch (error) {
      handleError(error);
    }
  };
  const getListFamilyTree = async () => {
    try {
      const res = await familyTreeApi.getListFamilyTree(currentIdGenealogy);
      if (res.data.StatusCode === 200) {
        const data = res.data.Data || []
        setListFamilyTree(res.data.Data || []);
        console.log(data)
        const treeItem = data.find(i => i.Users.find(i => i.UserId == user.Id));
        if(treeItem){
            setDataPost({...dataPost,IdFamilyTree:treeItem.Id})
            console.log(treeItem)
        }
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    getListFamilyTree();
  }, [currentIdGenealogy]);
  const getListPublicgene = async () => {
    try {
      const res = await genealogyApi.getListGegePublic();
      if (res.data.StatusCode === 200) {
        setListGene(res.data.Data.Data || []);
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    getListPublicgene();
  }, [id]);

  //
  // get List member
  const getListMember = async () => {
    try {
      const res = await genealogyApi.getListUserFromGenealogy(
        currentIdGenealogy
      );
      if (res.data.StatusCode === 200) {
        setlistMember(res.data.Data.Data);
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
      getListMember();
    
  }, [currentIdGenealogy]);

  return (
    <form className={classes.form}>
      <h4 style={{ marginBottom: 20 }} className="bold">
        Vị trí hiện tại trong gia phả
      </h4>
      <FormControl fullWidth variant="outlined">
        <InputLabel>Nhánh</InputLabel>
        <Select
          name="IdFamilyTree"
          value={dataPost.IdFamilyTree}
          onChange={e => setDataPost({...dataPost,IdFamilyTree:e.target.value})}
          label="Nhánh"
        >
          {listFamilyTree.map((i) => (
            <MenuItem value={i.Id}>{i.Name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        disabled={!dataPost.IdFamilyTree}
        onClick={() => onReqest()}
        variant="contained"
        color="primary"
      >
        Lưu
      </Button>
    </form>
  );
}

export default CurrentPositionGene;
