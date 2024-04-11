import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import useAuthStore from "../../../../../zustand/authStore";
import { USER_ROLE } from "../../../../../constant/common";
import { handleError } from "../../../../../ultils/helper";
import { genealogyApi } from "../../../../../api/genealogy.api";
import { familyTreeApi } from "../../../../../api/familyTree.api";
import CustomModal from "../../../../../components/common/modal/CustomModal";
import { toast } from "react-toastify";
function ListMemberPending() {
  const { isLogin, roleCode } = useAuthStore();

  const isSiteAdmin = isLogin && roleCode === USER_ROLE.SiteAdmin;
  const isSupperAdmin = isLogin && roleCode === USER_ROLE.SupperAdmin;
  const isPeopleAdmin = isLogin && roleCode === USER_ROLE.PeopleAdmin;
  const isUser = isLogin && roleCode === USER_ROLE.User;
  const isMember = isUser || isSiteAdmin || isPeopleAdmin;
  const [listFamilyTree, setListFamilyTree] = useState([]);
  const [users, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [idTree, setIdTree] = useState(0);
  const { currentIdGenealogy } = useAuthStore();
  const getListUserPending = async () => {
    try {
      const res = await genealogyApi.getListUserRequest(currentIdGenealogy);
      if (res.data.StatusCode === 200) {
        setUser(res.data.Data.Data || []);
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    if (currentIdGenealogy) {
      getListUserPending(currentIdGenealogy);
    }
  }, [currentIdGenealogy]);

  const handleReject = async (user) => {
    try {
      const res = await genealogyApi.deleteUserGene(
        currentIdGenealogy,
        user.Id
      );
      if (res.data.StatusCode === 200) {
        await getListUserPending();
        toast.success("Đã từ chôi");
      }
    } catch (error) {
      handleError(error);
    }
  };
  const onClose = () => {
    setCurrentUser(null);
  };
  const onApprove = async (user) => {
    try {
      const item = listFamilyTree.find(i => i.Id === idTree);
      if(item){
        console.log(item.users)
        if(item?.Users?.length >=2){
          toast.warning("Nhánh này đã đủ 2 người , vui lòng chọn nhánh khác");
          return;
        }
      }
      const res = await genealogyApi.approveUser({
        UserID: currentUser.UserId,
        IdFamilyTree: idTree,
        IdGenealogy: currentIdGenealogy,
      });
      if (res.data.StatusCode === 200) {
        await getListUserPending();
        onClose();
        toast.success("Đã xác nhận");
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
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Ngày Sinh</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Địa Chỉ</TableCell>
              <TableCell>Giới Tính</TableCell>
              {isSiteAdmin && (
                <TableCell className="text-center">Hành động</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.FirstName + " " + user.LastName}</TableCell>
                <TableCell>{user.DateOfBirth}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>{user.Address}</TableCell>
                <TableCell>{user.Gender == 0 ? "Nam" : "Nữ"}</TableCell>
                {isSiteAdmin && (
                  <TableCell className="text-center">
                    <Button
                      onClick={() => setCurrentUser(user)}
                      style={{
                        marginRight: 10,
                      }}
                      variant="contained"
                      color="success"
                    >
                      <CheckIcon fontSize="small" />
                    </Button>
                    <Button
                      onClick={() => handleReject(user)}
                      variant="contained"
                      color="error"
                    >
                      <CloseIcon fontSize="small" />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomModal open={currentUser} onClose={onClose}>
        <h4 style={{ marginBottom: 15 }}>Chọn chi/nhánh/phái/đời</h4>
        <FormControl>
          <InputLabel id="select-label">Chi/nhánh/phái/đời</InputLabel>
          <Select
            style={{
              width: 500,
              marginRight: 20,
            }}
            labelId="select-label"
            id="select"
            value={idTree}
            onChange={(e) => setIdTree(e.target.value)}
            label="Gia phả"
          >
            {listFamilyTree.map((i) => (
              <MenuItem value={i.Id}>{i.Name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={() => {
            if(idTree){
              onApprove();
            }
           
          }}
          variant="contained"
        >
          Xác nhận
        </Button>
      </CustomModal>
    </>
  );
}

export default ListMemberPending;
