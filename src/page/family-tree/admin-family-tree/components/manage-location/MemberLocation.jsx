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
  TablePagination,
  TextField
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import useAuthStore from "../../../../../zustand/authStore";
import { handleError } from "../../../../../ultils/helper";
import { genealogyApi } from "../../../../../api/genealogy.api";
import PrimaryButton from "../../../../../components/common/button/PrimaryButton";

function MemberLocation() {
  const [txtSearch, setTxtSearch] = useState("");
  const { userGenealogy,currentIdGenealogy } = useAuthStore();
  const [listMember, setlistMember] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
   setPage(newPage);
 };
  // get List member
  const getListMember = async () => {
    const IDGenealogy = currentIdGenealogy;
    try {
      const res = await genealogyApi.getListUserFromGenealogy(IDGenealogy || -1,txtSearch?.trim());
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
  <>
     <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <TextField
         style={{
          width: 300}}
          label="Tên thành viên"
          variant="outlined"
          value={txtSearch}
          onChange={(e) => setTxtSearch(e.target.value)}
        />
        <PrimaryButton title={"Tìm kiếm"} event={() => getListMember()} />
      </div>
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
          {listMember.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ).map((user, index) => (
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
    <TablePagination
        component="div"
        count={listMember.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
    
  );
}

export default MemberLocation;
