import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import useAuthStore from "../../../../../zustand/authStore";
import { USER_ROLE } from "../../../../../constant/common";

function ListMemberPending() {
  const { isLogin, roleCode } = useAuthStore();

  const isSiteAdmin = isLogin && roleCode === USER_ROLE.SiteAdmin;
  const isSupperAdmin = isLogin && roleCode === USER_ROLE.SupperAdmin;
  const isPeopleAdmin = isLogin && roleCode === USER_ROLE.PeopleAdmin;
  const isUser = isLogin && roleCode === USER_ROLE.User;
  const isMember = isUser || isSiteAdmin || isPeopleAdmin;
  const users = [
    {
      name: "Nguyễn Văn A",
      birthdate: "01/01/1990",
      email: "nguyenvana@example.com",
      address: "Hà Nội",
      gender: "Nam",
    },
    {
      name: "Trần Thị B",
      birthdate: "05/05/1985",
      email: "tranthib@example.com",
      address: "Hồ Chí Minh",
      gender: "Nữ",
    },
    {
      name: "Phạm Văn C",
      birthdate: "10/10/1995",
      email: "phamvanc@example.com",
      address: "Đà Nẵng",
      gender: "Nam",
    },
  ];
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên</TableCell>
            <TableCell>Ngày Sinh</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Địa Chỉ</TableCell>
            <TableCell>Giới Tính</TableCell>
           {isSiteAdmin &&  <TableCell className='text-center' >Hành động</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.birthdate}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.gender}</TableCell>
            {isSiteAdmin &&   <TableCell className='text-center'>
                <Button
                  style={{
                    marginRight: 10,
                  }}
                  variant="contained"
                  color="success"
                >
                  <CheckIcon fontSize="small" />
                </Button>
                <Button variant="contained" color="error">
                  <CloseIcon fontSize="small" />
                </Button>
              </TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListMemberPending;
