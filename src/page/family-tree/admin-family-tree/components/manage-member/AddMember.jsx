import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import AddImage from "../../../../../components/common/addImage/AddImage";
import { v4 as uuidv4 } from "uuid";
import {
  checkValidEmail,
  dateFormat,
  dateFormat2,
  handleError,
  uploadImageToFirebase,
  validateAddress,
  validateIDCard,
  validatePhoneNumber,
} from "../../../../../ultils/helper";
import { genderOptions2 } from "../../../../../constant/common";
import { familyTreeApi } from "../../../../../api/familyTree.api";
import useAuthStore from "../../../../../zustand/authStore";
import { toast } from "react-toastify";
import { genealogyApi } from "../../../../../api/genealogy.api";

function AddMemberForm({
  item,
  refreshData = () => {},
  idTree,
  onCloseModal,
  dataAddChild,
  isTree,
  firstMem,
  rootId
}) {
  const { currentIdGenealogy } = useAuthStore();
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
    DateOfBirth: null,
    DateOfDeath: null,
    Avatar: "",
    Type: 0,
    HomeTown: "",
    InActive: false,
    IsBlock: false,
    TypeRole: 0,
    IdFamilyTree: idTree,
    IdGenealogy: "",
    UserId: 0,
    JobTitle: "",
    IsMartyrs: false,
    Description: "",
  };

  const [memberData, setMemberData] = useState(
    item
      ? {
          ...item,
          DateOfBirth: dateFormat2(item.DateOfBirth),
          DateOfDeath: dateFormat2(item.DateOfDeath),
        }
      : originData
  );
  console.log(memberData);
  const [listFamilyTree, setListFamilyTree] = useState([]);

  const fileRef = useRef();

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
    console.log("Vao add")
    try {
      if (memberData?.Email?.trim() && !checkValidEmail(memberData.Email)) {
        toast.error("Email sai định dạng");
        return;
      }
      if (validatePhoneNumber(memberData.Phone) === false) {
        toast.error("Định dạng điện thoại không chính xác. Yêu cầu 10 số");
        return;
      }
      if (validateIDCard(memberData.Indentification) === false) {
        toast.error("Định dạng CCCD không chính xác. Yêu cầu 9- 12 số");
        return;
      }
      if (validateAddress(memberData.Address) === false) {
        toast.error("Địa chỉ cần cụ thể hơn.");
        return;
      }

      // Them con
      let nodeId;
      if (dataAddChild || (firstMem && !rootId)) {
        console.log("vao if")
        const nodeRes = await familyTreeApi.addTree({
          name: dataAddChild ? "Node " + uuidv4()?.slice(0, 8) :"root",
          description: "",
          Id: 0,
          IdGenealogy: currentIdGenealogy,
          parentId: dataAddChild ? dataAddChild?.idParent:null,
        });
        nodeId = nodeRes.data.Data
      }
      // End them con
      const res = !item
        ? await genealogyApi.addNewMember({
            ...memberData,
            IdGenealogy: currentIdGenealogy,
            IsMartyrs: false,
            IdFamilyTree:rootId ||nodeId || memberData.IdFamilyTree
          })
        : await genealogyApi.updateUsergene({
            ...memberData,
            IdGenealogy: currentIdGenealogy,
            Name: "sss",
            IsMartyrs: JSON.parse(memberData.IsMartyrs),
            DateOfDeath: memberData.DateOfDeath || null,
            DateOfBirth: memberData.DateOfBirth || null,
          });
      if (res.data.StatusCode === 200) {
        if (!item) {
          setMemberData(originData);
          toast.success("Thêm thành công");
          if (idTree || firstMem) {
            onCloseModal();
          }
        } else {
          await refreshData();
          toast.success("Sửa thành công");
        }
        getListFamilyTree();
      }
      if (res.data.StatusCode === 400) {
        toast.error(res.data.Data || "Email đã tồn tại", {
          autoClose: 500,
        });
      }
    } catch (error) {
      console.log(error);
      console.log("day 1");
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
      console.log("day 2");
      handleError(error);
    }
  };
  useEffect(() => {
    getListFamilyTree();
  }, [currentIdGenealogy]);

  const getTitle = () => {
    let title = "Thêm thành viên";
    if (item) {
      title = "Sửa thông tin thành viên";
    }
    if (dataAddChild) {
      title = "Thêm con";
    }
    if (idTree && isTree) {
      title = "Thêm vợ/chồng";
    }
    return title;
  };
  return (
    <Container>
      <form>
        <h4
          style={{
            textAlign: "center",
            marginBottom: 15,
            fontWeight: "bold",
          }}
        >
          {getTitle()}
        </h4>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
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
                  required
                  fullWidth
                  label="Tên đệm và tên"
                  variant="outlined"
                  name="LastName"
                  value={memberData.LastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mô tả"
                  variant="outlined"
                  name="Description"
                  value={memberData.Description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={item}
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
                <TextField
                  fullWidth
                  label="Nghề nghiệp"
                  variant="outlined"
                  name="JobTitle"
                  value={memberData.JobTitle}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Giới tính *</InputLabel>
                  <Select
                    required
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
                  required
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
              <Grid item xs={(dataAddChild || firstMem) ? 12 : 6}>
                <TextField
                  fullWidth
                  label="Nơi sinh"
                  variant="outlined"
                  name="HomeTown"
                  value={memberData.HomeTown}
                  onChange={handleChange}
                />
              </Grid>
              {(!dataAddChild && !firstMem) && (
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Chi - nhánh *</InputLabel>
                    <Select
                      required
                      name="IdFamilyTree"
                      value={memberData.IdFamilyTree}
                      onChange={handleChange}
                      label="Chi - nhánh"
                    >
                      {listFamilyTree.map((i) => (
                        <MenuItem value={i.Id}>{i.Name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              <Grid item xs={6}>
                <div
                  style={{
                    width: "100%",
                  }}
                  className="flex-start"
                >
                  <FormControl component="fieldset">
                    <FormLabel
                      style={{
                        textAlign: "start",
                      }}
                      component="legend"
                    >
                      Là liệt sỹ
                    </FormLabel>
                    <RadioGroup
                      row
                      value={memberData.IsMartyrs}
                      onChange={handleChange}
                      name="IsMartyrs"
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="Phải"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="Không"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            item
            xs={12}
          >
            <Button
              disabled={
                !memberData.FirstName ||
                !memberData.LastName ||
                memberData.Gender === "" ||
                (!memberData.IdFamilyTree && !firstMem) ||
                !memberData.DateOfBirth
              }
              onClick={() => onAdd()}
              variant="contained"
              color="primary"
            >
              {!item ? " Thêm Thành Viên" : "Cập nhật"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AddMemberForm;
