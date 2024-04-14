import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Container,
} from "@mui/material";
import AddImage from "../../../../../components/common/addImage/AddImage";
import {
  handleError,
  uploadImageToFirebase,
} from "../../../../../ultils/helper";
import { genderOptions2 } from "../../../../../constant/common";
import { familyTreeApi } from "../../../../../api/familyTree.api";
import useAuthStore from "../../../../../zustand/authStore";
import { toast } from "react-toastify";
import { genealogyApi } from "../../../../../api/genealogy.api";

function AddMemberForm({ item, refreshData }) {
  const originData = {
    Id: 0,
    ModifiedBy: "string",
    ModifiedDate: "2024-04-08T07:47:36.694Z",
    CreatedBy: "string",
    CreatedDate: "2024-04-08T07:47:36.694Z",
    FirstName: "",
    LastName: "",
    Email: "",
    Indentification: "",
    Phone: "",
    Address: "",
    Gender: "",
    DateOfBirth: "",
    DateOfDeath: "",
    Avatar: "",
    Type: 0,
    HomeTown: "",
    InActive: false,
    IsBlock: false,
    TypeRole: 0,
    IdFamilyTree: "",
    IdGenealogy: "",
    UserId: 0,
  };

  const [memberData, setMemberData] = useState(item || originData);
  const [listFamilyTree, setListFamilyTree] = useState([]);

  const fileRef = useRef();
  const { currentIdGenealogy } = useAuthStore();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMemberData({
      ...memberData,
      [name]: value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const url = await uploadImageToFirebase(file);

    setMemberData({
      ...memberData,
      Avatar: url,
    });
  };

  // Add
  const onAdd = async () => {
    try {
      // const itemTree = listFamilyTree.find(i => i.Id == memberData.IdFamilyTree);
      // if(itemTree){
        
      //   if(itemTree?.Users?.length >=2){
      //     if(!item){
      //       toast.warning("Nhánh này đã đủ 2 người , vui lòng chọn nhánh khác");
      //       return;
      //     }
      //     else{
      //       console.log(item)
      //       const  itemIdTree = item.IdFamilyTree;
      //       const itemUserId = item.UserId;
      //       if(!itemTree?.Users.map(i => i.UserId)?.includes(itemUserId)){
      //         toast.warning("Nhánh này đã đủ 2 người , vui lòng chọn nhánh khác");
      //         return;
      //       }
      //     }
         
      //   }
      // }
      const res = !item
        ? await genealogyApi.addNewMember({
            ...memberData,
            IdGenealogy: currentIdGenealogy,
          })
        : await genealogyApi.updateUsergene({
            ...memberData,
            IdGenealogy: currentIdGenealogy,
            Name:"sss"
          });
      if (res.data.StatusCode === 200) {
        if(!item){
          setMemberData(originData);
        toast.success("Thêm thành công");
        }
        else{
          await refreshData();
          toast.success("Sửa thành công");
        }
        getListFamilyTree()
      }
    } catch (error) {
      handleError(error);
    }
  };
  // // get List Family Tree
  const getListFamilyTree = async () => {
    try {
      const res = await familyTreeApi.getListFamilyTree(currentIdGenealogy);
      if (res.data.StatusCode === 200) {
        setListFamilyTree(res.data.Data || []);
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    getListFamilyTree();
  }, [currentIdGenealogy]);

  return (
    <Container>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Họ"
                  variant="outlined"
                  name="FirstName"
                  value={memberData.FirstName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Tên"
                  variant="outlined"
                  name="LastName"
                  value={memberData.LastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  name="Email"
                  value={memberData.Email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="CCCD/CMND"
                  variant="outlined"
                  name="Indentification"
                  value={memberData.Indentification}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  variant="outlined"
                  name="Phone"
                  value={memberData.Phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  variant="outlined"
                  name="Address"
                  value={memberData.Address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Giới tính</InputLabel>
                  <Select
                    name="Gender"
                    value={memberData.Gender}
                    onChange={handleChange}
                    label="Giới tính"
                  >
                    {genderOptions2.map((i) => (
                      <MenuItem value={i.value}>{i.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <input
              ref={fileRef}
              accept="image/*"
              id="contained-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <AddImage
              url={memberData.Avatar}
              click={() => fileRef.current.click()}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Ngày sinh"
                  variant="outlined"
                  type="date"
                  name="DateOfBirth"
                  value={memberData.DateOfBirth}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Ngày mất"
                  variant="outlined"
                  type="date"
                  name="DateOfDeath"
                  value={memberData.DateOfDeath}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Nơi sinh"
                  variant="outlined"
                  name="HomeTown"
                  value={memberData.HomeTown}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Chi/nhánh/phái/đời</InputLabel>
                  <Select
                    name="IdFamilyTree"
                    value={memberData.IdFamilyTree}
                    onChange={handleChange}
                    label="Chi/nhánh/phái/đời"
                  >
                    {listFamilyTree.map((i) => (
                      <MenuItem value={i.Id}>{i.Name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => onAdd()} variant="contained" color="primary">
              {!item ? " Thêm Thành Viên" : "Cập nhật"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AddMemberForm;
