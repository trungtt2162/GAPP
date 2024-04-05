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
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import useAuthStore from "../../../../../zustand/authStore";
import { handleError } from "../../../../../ultils/helper";
import { genealogyApi } from "../../../../../api/genealogy.api";

function MemberLocation() {
  const { userGenealogy } = useAuthStore();
  const [listMember, setlistMember] = useState([]);

  // get List member
  const getListMember = async () => {
    const IDGenealogy = userGenealogy[0]?.IdGenealogy;
    try {
      const res = await genealogyApi.getListUserFromGenealogy(IDGenealogy);
      if (res.data.StatusCode === 200) {
        setlistMember(res.data.Data.Data);
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getListMember();
  }, [userGenealogy]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Địa Chỉ</TableCell>
            {/* <TableCell className='text-center'>Hành động</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {listMember.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user?.FirstName + " " + user?.LastName}</TableCell>

              <TableCell>{user.Email}</TableCell>
              <TableCell>{user.Address}</TableCell>
              {/* <TableCell className='text-center'>
                <Button
                  style={{
                    marginRight: 10,
                  }}
                  variant="contained"
                  color="success"
                >
                 Sửa
                </Button>
                <Button variant="contained" color="error">
                 Xóa
                </Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MemberLocation;
