import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@mui/material";
import { familyTreeApi } from "../../../../../api/familyTree.api";
import useAuthStore from "../../../../../zustand/authStore";
import { handleError } from "../../../../../ultils/helper";
import { toast } from "react-toastify";

const AddBranch = ({ item, getListAllNode }) => {
  const [currentMember, setCurrentMember] = useState(null);
  const [listNode, setListNode] = useState([]);
  const [listFamilyTree, setListFamilyTree] = useState([]);
  const { currentIdGenealogy } = useAuthStore();
  let disalbedRoot = false;
  const getListAllNode1 = async () => {
    const res = await familyTreeApi.getListAllNode(currentIdGenealogy);
    if (res.data.StatusCode === 200) {
      setListNode(res.data.Data);
    }
  };

  useEffect(() => {
    if (currentIdGenealogy) {
      getListAllNode1();
    }
  }, [currentIdGenealogy]);

  //
  const currentRoot = listFamilyTree.find((i) => i.ParentID == null);
  if (currentRoot) {
    if (item && item.ParentID == "000") {
      disalbedRoot =  false;
    }
    disalbedRoot= true;
  }
  const classes = {};
 
  // State để lưu trữ giá trị của các trường
  const originData = {
    IdGenealogy: 0,
    Id: 0,
    name: "",
    description: "",
    parentId: "",
  };
  const [formData, setFormData] = useState(item || originData);

  // Xử lí sự kiện thay đổi giá trị của các trường input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lí sự kiện khi nhấn nút Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu đến server hoặc xử lí theo nhu cầu
    console.log(formData);
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
  const handleAdd = async () => {
    try {
      const res = !item
        ? await familyTreeApi.addTree({
            ...formData,
            IdGenealogy: currentIdGenealogy,
            parentId: formData.parentId === "000" ? null : formData.parentId,
          })
        : await familyTreeApi.updateTree({
            ...formData,
            IdGenealogy: currentIdGenealogy,
            parentId: formData.parentId === "000" ? null : formData.parentId,
          });
      if (res.data.StatusCode === 200) {
        if (!item) {
          setFormData(originData);
          toast.success("Thêm thành công");
          getListFamilyTree();
        } else {
          toast.success("Đã sửa");
          getListAllNode();
        }
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Tên nhánh"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          rows={4}
          name="description"
          label="Mô tả"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <div>
          <FormControl
            style={{ width: "100%" }}
            className={classes.formControl}
          >
            <InputLabel id="parent-id-label">Nhánh cha</InputLabel>
            <Select
              labelId="parent-id-label"
              id="parent-id-select"
              name="parentId"
              value={formData.parentId}
              onChange={handleChange}
            >
              {/* Thay đổi MenuItem theo nhu cầu */}
              <MenuItem disabled={disalbedRoot} value={"000"}>Không có nhánh cha</MenuItem>
              {listFamilyTree.map((i) => (
                <MenuItem value={i.Id}>{i.Name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Button
          onClick={() => handleAdd()}
          style={{ marginTop: 20 }}
          variant="contained"
          color="primary"
        >
          {item ? "Sửa" : "Thêm"}
        </Button>
      </form>
    </Container>
  );
};

export default AddBranch;
