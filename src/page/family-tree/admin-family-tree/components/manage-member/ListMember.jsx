import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";

import PrimaryButton from "../../../../../components/common/button/PrimaryButton";
import {
  dateFormat,
  dateFormat2,
  handleError,
} from "../../../../../ultils/helper";
import { genealogyApi } from "../../../../../api/genealogy.api";
import useAuthStore from "../../../../../zustand/authStore";
import { LIST_ROLE, USER_ROLE } from "../../../../../constant/common";
import CustomModal from "../../../../../components/common/modal/CustomModal";
import AddMemberForm from "./AddMember";

function ListMember({ list,action=true }) {
  const [listMember, setlistMember] = useState([]);
  const { userGenealogy, currentIdGenealogy, roleCode, user } = useAuthStore();
  const isSiteAdmin = roleCode === USER_ROLE.SiteAdmin;
  const curremtList = list || listMember;
  const [currentMember, setCurrentMember] = useState(null);

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
    if (!list) {
      getListMember();
    }
  }, [currentIdGenealogy]);

  const handleChange = (user, index) => async (e) => {
    const newRole = e.target.value;
    try {
      const res = await genealogyApi.changeRoleUser({
        IdGenealogy: currentIdGenealogy,
        UserID: user.UserId,
        RoleCode: newRole,
      });
      if (res.data.StatusCode === 200) {
        toast.success("Đã sửa");
        const list = [...listMember];
        list[index].RoleCode = newRole;
        setlistMember(list);
      }
    } catch (error) {
      handleError(error);
    }
  };
  const handleDelete = async (user) => {
    try {
      const res = await genealogyApi.deleteUserGene(
        currentIdGenealogy,
        user.Id
      );
      if (res.data.StatusCode === 200) {
        await getListMember();
        toast.success("Đã xóa");
      }
    } catch (error) {
      handleError(error);
    }
  };
  const refreshData = async () => {
    await getListMember();
    setCurrentMember(null)
  }
  return (
    <div>
      <div
        className="flex-start"
        style={{
          marginBottom: 10,
        }}
      ></div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Ngày Sinh</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Giới Tính</TableCell>
              <TableCell>Quyền</TableCell>

              {(isSiteAdmin && action) && <TableCell>Hành động</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {curremtList.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user?.FirstName + " " + user?.LastName}</TableCell>
                <TableCell>{dateFormat(user.DateOfBirth)}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell >{user.Gender === 0 ? "Nam" : "Nữ"}</TableCell>
                {(isSiteAdmin && user.RoleCode !== USER_ROLE.SiteAdmin && action) ? (
                  <>
                    <FormControl
                      style={{
                        marginTop: 10,
                        marginBottom: 10,
                        marginRight: 10,
                        width: 120,
                      }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Quyền
                      </InputLabel>
                      <Select
                        style={{
                          padding: 0,
                          height:40
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user.RoleCode}
                        label="Quyền"
                        onChange={handleChange(user, index)}
                      >
                        {LIST_ROLE.map((item) => (
                          <MenuItem value={item.RoleCode}>
                            {item.RoleCode === "Account" ? "User":item.RoleCode}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                ) : (
                  <TableCell>{user.RoleCode}</TableCell>
                )}
                {(isSiteAdmin && user.RoleCode !== USER_ROLE.SiteAdmin && action) && (
                  <TableCell>
                    <Button
                      onClick={() => setCurrentMember(user)}
                      style={{
                        marginRight: 10,
                      }}
                      variant="contained"
                      color="success"
                    >
                      Sửa
                    </Button>
                    <Button
                      onClick={() => handleDelete(user)}
                      variant="contained"
                      color="error"
                    >
                      Xóa
                    </Button>
                  </TableCell>
                )}
                {/*  */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomModal open={currentMember} onClose={() => setCurrentMember(null)}>
        <AddMemberForm
        refreshData={refreshData}
          item={
            currentMember
              ? {
                  ...currentMember,
                  DateOfBirth: dateFormat2(currentMember.DateOfBirth),
                  DateOfDeath: dateFormat2(currentMember.DateOfDeath),
                }
              : null
          }
        />
      </CustomModal>
    </div>
  );
}

export default ListMember;
