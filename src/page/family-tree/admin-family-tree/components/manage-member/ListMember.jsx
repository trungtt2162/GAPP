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
} from "@mui/material";
import PrimaryButton from "../../../../../components/common/button/PrimaryButton";
import { handleError } from "../../../../../ultils/helper";
import { genealogyApi } from "../../../../../api/genealogy.api";
import useAuthStore from "../../../../../zustand/authStore";
import { LIST_ROLE, USER_ROLE } from "../../../../../constant/common";

function ListMember({list }) {
  const [listMember, setlistMember] = useState([]);
  const { userGenealogy, currentIdGenealogy, roleCode, user } = useAuthStore();
  const isSiteAdmin = roleCode === USER_ROLE.SiteAdmin;
  const curremtList = list || listMember

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
    if(!list){
      getListMember();
    }
  }, [currentIdGenealogy]);

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
              <TableCell>Địa Chỉ</TableCell>
              <TableCell>Giới Tính</TableCell>
              {/* {isSiteAdmin && <TableCell>Quyền</TableCell>} */}
            </TableRow>
          </TableHead>
          <TableBody>
            {curremtList.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user?.FirstName + " " + user?.LastName}</TableCell>
                <TableCell>{user.DateOfBirth}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>{user.Address}</TableCell>
                <TableCell>{user.Gender === 0 ? "Name" : "Nữ"}</TableCell>
                {/*  */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ListMember;
